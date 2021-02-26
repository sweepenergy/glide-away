import json
import websocket
import os
import asyncio
import requests
import _thread as thread
import sys
import time
import datetime
from lib.genStationArray import genStationArray

from requests.auth import HTTPBasicAuth
from concurrent.futures import ThreadPoolExecutor, as_completed

# PROD_ENV = os.getenv("PROD_ENV")
sweepapi_user = os.getenv('SWEEP_API_ID') ## user key from api keys ui
sweepapi_token = os.getenv('SWEEP_API_TOKEN') ## user token from api keys ui


sweepapi_user = ""
sweepapi_token = ""


endpoint = "wss://qa.rt.sweepapi.com/?auth_user={}&auth_key={}".format(sweepapi_user,sweepapi_token)

def on_message(ws, message):
    try:
        msg_rec = json.loads(message)
        if "action_url" in msg_rec:
            if msg_rec["action_url"] == "/account/verify_auth":
                msg = {"ws_action": "watch", "watch_streams":["_DEFINE_STREAM_ID_TO_WATCH_FOR_CHANGES_"]}
                final_msg = json.dumps(msg)
                ws.send(final_msg)
        if "action" in msg_rec:
            if msg_rec["action"] == "watch":
                # IF wind_speed raw sample is sent through POST in another program, then WS connection will recive a copy of the raw data if requested
                if msg_rec["key"] == "stream._DEFINE_STREAM_ID_TO_WATCH_FOR_CHANGES_:wind_speed.ts:raw_text":
                    print(msg_rec)
    except:
        print(sys.exc_info()[0], flush=True)

def on_error(ws, error):
    print(error, flush=True)

def on_close(ws):
    print("### closed ###", flush=True)

def on_open(ws):
    pass

executor = ThreadPoolExecutor(max_workers=50)

def getAccount():
    res = requests.get("https://api.sweepapi.com/account",auth=HTTPBasicAuth(sweepapi_user, sweepapi_token))
    return res.json()

def getDir(directory_id):
    res = requests.get("https://api.sweepapi.com/directory/{}".format(directory_id),auth=HTTPBasicAuth(sweepapi_user, sweepapi_token))
    return res.json()

def getStream(stream_id):
    res = requests.get("https://api.sweepapi.com/stream/{}".format(stream_id),auth=HTTPBasicAuth(sweepapi_user, sweepapi_token))
    return res.json()

def genFolder(name,top_dir):
    payload = {
    "name" : name,
    "dirtop":top_dir
    }
    res = requests.post("https://api.sweepapi.com/directory", json=payload ,auth=HTTPBasicAuth(sweepapi_user, sweepapi_token))
    return res.json()

def genStream(name,top_dir):
    payload = {}
    payload["name"] = name
    payload["directory_id"] = top_dir
    payload["inputDataVar"] = []
    res = requests.post("https://api.sweepapi.com/stream", json=payload ,auth=HTTPBasicAuth(sweepapi_user, sweepapi_token))
    return res.json()

def genTSParam(dataset,stream_id):
    res = requests.post("https://api.sweepapi.com/stream/{}/ts".format(stream_id), json=dataset ,auth=HTTPBasicAuth(sweepapi_user, sweepapi_token))
    return res.json()

def saveComplete(key,home_store_directory):
    station_folder[key] = {}
    ind_station = False

    stream_item = [item for item in home_store_directory['stream'] if item['name'] == key]
    print(stream_item)

    if len(stream_item):
        print("Stream Exists: Will not Make A New Stream")
        station_folder[key]["stream_id"] = stream_item[0]["stream_id"];
    else:
        print("New Stream will be created from JSON list")
        res_stream = genStream(key,home_store_directory["directory_id"])
        if res_stream["status"] == "ok":
            station_folder[key]["stream_id"] = res_stream["stream_id"];

    # this checks to see if ind station stream has wind_speed as ts_param
    ind_station_stream = getStream(station_folder[key]["stream_id"])
    # print(ind_station_dir)

    var_name_select = "wind_speed"

    stream_item_ts_param = [item for item in ind_station_stream['schema'] if item['var_name'] == var_name_select]
    # print(stream_item)

    if len(stream_item_ts_param):
        # print("stream_ts_param_exists")
        station_folder[key]["ts_param"] = var_name_select;
    else:
        payload_data = {}
        payload_data["var_name"] = var_name_select
        payload_data["display_name"] = "Wind Speed"
        payload_data["description"] = "Realtime Wind Speed"
        payload_data["units"] = "mph"
        payload_data["type"] = "number"
        res_stream_ts = genTSParam(payload_data,station_folder[key]["stream_id"])
        if res_stream_ts["status"] == "ok":
            station_folder[key]["ts_param"] = var_name_select

def saveData(line):
    res = requests.post(line['url'], data=line['payload'] ,auth=HTTPBasicAuth(sweepapi_user, sweepapi_token))
    return res.json()

def sleepResolveError(error):
    print ("\rWaiting for error to pass"+str(error), end="")
    time.sleep(10)

if __name__ == '__main__':

    websocket.enableTrace(False)
    ws = websocket.WebSocketApp(endpoint,
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    print("Saving WS to thread", flush=True)
    thread.start_new_thread(ws.run_forever, ())


    home_directory = getDir("home")
    check_station_directory = False
    station_directory_name = "Sensors"
    station_dir_id = ""
    station_folder = {}
    print(home_directory, flush=True)
    directory_item_home_station_unique = [item for item in home_directory['directory'] if item['name'] == station_directory_name]
    print(len(directory_item_home_station_unique))
    if len(directory_item_home_station_unique):
        print("directory 'Sensors' exists")
        station_dir_id = directory_item_home_station_unique[0]["id"]
        station_directory = getDir(station_dir_id)
        station_name = "Weather Stations"
        station_ind_folder = [item for item in station_directory['directory'] if item['name'] == station_name]
        if len(station_ind_folder):
            station_ind_dir_id = station_ind_folder[0]["id"]
        else:
            station_ind_gen_folder = genFolder(station_name,station_dir_id)
            print(station_ind_gen_folder)
            if station_ind_gen_folder["status"] == "ok":
                station_ind_dir_id = station_ind_gen_folder["id"];
        station_ind_directory = getDir(station_ind_dir_id)

        alias_station_stream_id = {}
        for line_data in station_ind_directory["stream"]:
            stream_id = line_data["name"]
            alias_station_stream_id[stream_id] = line_data

        ## update stream portion of dict to reflect easy
        array_data = ['test.json']
        stations_list = genStationArray(array_data).getStations()
        processes = {}
        for key in stations_list:
            key = key.strip()
            job = executor.submit(saveComplete, key,station_ind_directory)
            processes[job]=key
        while len(processes) > 0:
            time.sleep(1)
            # print(len(processes))
            # print(processes)
            # print("Checking to see if all done")
            for x in as_completed(processes):
                del processes[x]
        print("Stage 1: Complete", flush=True)

        s_list = stations_list.keys()

        while True:
            url_dataset = []
            # print(s_list)
            time_now = datetime.datetime.utcnow().replace(microsecond=0).isoformat()
            ## ONCE ALL STREAMS AND DIRECTORIES DEFINED. Make Request for Data and send back to API
            for station_item in s_list:
                print("Saving Raw Sample Data for {} ".format(station_item))
                if station_item is not None:
                    line = {}
                    sample = 34.5 ### RANDOM DATA
                    line['payload'] = {'timestamp':time_now , 'sample': sample}
                    line['url'] = 'https://api.sweepapi.com/stream/{}/ts/{}/dataset'.format(alias_station_stream_id[station_item]["id"],"wind_speed")
                    url_dataset.append(line)
                    print(url_dataset)

            # Makes http request in parallel
            for urldata in url_dataset:
                # executor.submit(saveData, urldata)
                job = executor.submit(saveData, urldata)
                processes[job] = urldata
            # verify if job complete and del completed instances
            for x in as_completed(processes):
                del processes[x]
            print("Regular loop for collecting data")
            time.sleep(5)
    else:
        print("'Sensors' Directory Does Not exists")
