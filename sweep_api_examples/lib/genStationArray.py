import json
class genStationArray:
    def __init__(self,Station_file):
        self.Station_file = Station_file
        self.Stations_list = {}
    def getStations(self):
        for file_str in self.Station_file:
            with open(file_str) as f:
                data = json.load(f)
                for item in data:
                    if item['name'] not in self.Stations_list:
                        line = {}
                        line['name'] = item['name']
                        self.Stations_list[item['name']] = line
        return self.Stations_list
