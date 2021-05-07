import json
import os
import asyncio
import requests
import _thread as thread
import sys
import time
import datetime

from dotenv import load_dotenv
from lib.genStationArray import genStationArray
from requests.auth import HTTPBasicAuth
from concurrent.futures import ThreadPoolExecutor, as_completed, process

load_dotenv()

URL = os.getenv("URL")
SWEEP_API_USER = os.getenv("SWEEP_API_ID")
SWEEP_API_TOKEN = os.getenv("SWEEP_API_TOKEN")
ENDPOINT = "wss://rt.sweepapi.com/?auth_user={0}&auth_key={1}".format(
    SWEEP_API_USER, SWEEP_API_TOKEN)

executor = ThreadPoolExecutor(max_workers=50)


def getAccount():
    return requests.get("{0}/account".format(URL), auth=HTTPBasicAuth(SWEEP_API_USER, SWEEP_API_TOKEN)).json()


def getDirectory(directory_id):
    return requests.get("{0}/directory/{1}".format(URL, directory_id), auth=HTTPBasicAuth(SWEEP_API_USER, SWEEP_API_TOKEN)).json()


def getStream(stream_id):
    return requests.get("{0}/stream/{1}".format(URL, stream_id), auth=HTTPBasicAuth(SWEEP_API_USER, SWEEP_API_TOKEN)).json()


def genFolder(name, top_directory):
    return requests.post("{0}/directory".format(URL), json={"name": name, "dirtop": top_directory}, auth=HTTPBasicAuth(SWEEP_API_USER, SWEEP_API_TOKEN)).json()


def genStream(name, top_directory):
    return requests.post("{0}/stream".format(URL), json={"name": name, "dirtop": top_directory, "inputDataVar": []}, auth=HTTPBasicAuth(SWEEP_API_USER, SWEEP_API_TOKEN)).json()


def genTSParam(dataset, stream_id):
    return requests.post("{0}/stream/{1}/ts".format(URL, stream_id), json=dataset, auth=HTTPBasicAuth(SWEEP_API_USER, SWEEP_API_TOKEN)).json()


def saveComplete(key, home_store_directory):
    station_folder[key] = {}
    stream_item = [
        item for item in home_store_directory["stream"] if item["name"] == key]
    print(stream_item)

    if len(stream_item):
        print("Stream Exists: Will not Make a New Stream")
        station_folder[key]["stream_id"] = stream_item[0]["stream_id"]
    else:
        print("New Stream will be created from JSON list")
        response_stream = genStream(key, home_store_directory["directory_id"])
        if response_stream["status"] == "ok":
            station_folder[key]["stream_id"] = response_stream["stream_id"]

    # this checks to see if ind station stream has wind_speed as ts_param
    ind_station_stream = getStream(station_folder[key]["stream_id"])
    var_name_select = "wind_speed"
    stream_item_ts_param = [
        item for item in ind_station_stream['schema'] if item["var_name"] == var_name_select]

    if len(stream_item_ts_param):
        station_folder[key]["ts_param"] = var_name_select
    else:
        response_stream_ts = genTSParam({"var_name": var_name_select, "display_name": "Wind Speed",
                                         "description": "Realtime Wind Speed", "units": "mph", "type": "number"}, station_folder[key]["stream_id"])
        if response_stream_ts["status"] == "ok":
            station_folder[key]["ts_param"] = var_name_select


def saveData(line):
    return requests.post(line["url"], data=line["payload"], auth=HTTPBasicAuth(SWEEP_API_USER, SWEEP_API_TOKEN)).json()


def sleepResolveError(error):
    print("\rWaiting for error to pass" + str(error), end="")
    time.sleep(10)


if __name__ == "__main__":
    home_directory = getDirectory("4f85837b-1449-4135-9924-67d83359d569")
    check_station_directory = False
    station_directory_name = "Sensors"
    station_directory_id = ""
    station_folder = {}
    print(home_directory, flush=True)
    directory_item_home_station_unique = [
        item for item in home_directory["directory"] if item["name"] == station_directory_name]
    print(len(directory_item_home_station_unique))

    if len(directory_item_home_station_unique):
        print("directory 'Sensors' exists")
        station_directory_id = directory_item_home_station_unique[0]["id"]
        station_directory = getDirectory(station_directory_id)
        station_name = "Weather Stations"
        station_ind_folder = [
            item for item in station_directory["directory"] if item["name"] == station_name]

        if len(station_ind_folder):
            station_ind_directory_id = station_ind_folder[0]["id"]
        else:
            station_ind_gen_folder = genFolder(
                station_name, station_directory_id)
            print(station_ind_gen_folder)

            if station_ind_gen_folder["status"] == "ok":
                station_ind_directory_id = station_ind_gen_folder["id"]

        station_ind_directory = getDirectory(station_ind_directory_id)
        alias_station_stream_id = {}

        for line_data in station_ind_directory["stream"]:
            stream_id = line_data["name"]
            alias_station_stream_id[stream_id] = line_data

        # update stream portion of dict to reflect easy
        array_data = ["data/stations.json"]
        stations_list = genStationArray(array_data).getStations()
        processes = {}

        for key in stations_list:
            key = key.strip()
            job = executor.submit(saveComplete, key, station_ind_directory)
            processes[job] = key

        while len(processes) > 0:
            time.sleep(1)
            for x in as_completed(processes):
                del processes[x]

        print("Stage 1: Complete", flush=True)
        s_list = stations_list.keys()

        while True:
            url_dataset = []
            # Once all streams and directories defined. Make request for data and send back to API
            time_now = datetime.datetime.utcnow().replace(microsecond=0).isoformat()

            for station_item in s_list:
                print("Saving Raw Sample Data for {} ".format(station_item))

                if station_item is not None:
                    line = {}
                    sample = 34.5  # Randome data
                    line["payload"] = {"timestamp": time_now, "sample": sample}
                    line["url"] = "/stream/{0}/ts/{1}/dataset".format(
                        URL, alias_station_stream_id[station_item]["id"], "wind_speed")
                    url_dataset.append(line)
                    print(url_dataset)

            # Makes http request in parallel
            for urldata in url_dataset:
                job = executor.submit(saveData, urldata)
                processes[job] = urldata

            # verify if job complete and del completed instances
            for x in as_completed(processes):
                del processes[x]

            print("Regular loop for collection data")
            time.sleep(5)
    else:
        print("'Sensors' Directory Does Not exists")
