#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 02:05:16 2018

@author: matthewyeo
"""

import json
import requests
from lxml import html
from collections import OrderedDict
import argparse
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from lxml.html.soupparser import fromstring as fs
import pandas as pd
import string

def parse(source, destination, date, pax):
    for i in range(5):
            url = "https://www.expedia.com/Flights-Search?trip=oneway&leg1=from:{0},to:{1},departure:{2}TANYT&passengers=adults:{3},children:0,seniors:0,infantinlap:Y&options=cabinclass%3Aeconomy&mode=search&origref=www.expedia.com".format(source,destination,date,pax)
            headers1 = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'}
            response = requests.get(url)
            parser = html.fromstring(response.text)
            json_data_xpath = parser.xpath("//script[@id='cachedResultsJson']//text()")
            raw_json =json.loads(json_data_xpath[0])
            flight_data = json.loads(raw_json["content"])


            lists=[]

            flight_info = []

            for i in flight_data['legs'].keys():
                temp = []

                total_distance =  flight_data['legs'][i]["formattedDistance"].encode('ascii','ignore')
                exact_price = str(int(flight_data['legs'][i]['price']['totalPriceAsDecimal']))

                temp.append(exact_price)
                temp.append(total_distance)

                departure_location_airport = flight_data['legs'][i]['departureLocation']['airportCity'].encode('ascii','ignore')
                departure_location_city = flight_data['legs'][i]['departureLocation']['airportCity'].encode('ascii','ignore')
                departure_location_airport_code = flight_data['legs'][i]['departureLocation']['airportCode'].encode('ascii','ignore')

                ##temp.append(departure_location_airport)
                temp.append(departure_location_city)
                temp.append(departure_location_airport_code)

                arrival_location_airport = flight_data['legs'][i]['arrivalLocation']['airportCity'].encode('ascii','ignore')
                arrival_location_airport_code = flight_data['legs'][i]['arrivalLocation']['airportCode'].encode('ascii','ignore')
                arrival_location_city = flight_data['legs'][i]['arrivalLocation']['airportCity'].encode('ascii','ignore')
                airline_name = flight_data['legs'][i]['carrierSummary']['airlineName'].encode('ascii','ignore')

                ##temp.append(arrival_location_airport)
                temp.append(arrival_location_city)
                temp.append(arrival_location_airport_code)
                temp.append(airline_name)

                no_of_stops = flight_data['legs'][i]["stops"]
                flight_duration =flight_data['legs'][i]['duration']
                flight_hour = str(int(flight_duration['hours']))
                flight_minutes = str(int(flight_duration['minutes']))
                flight_days = flight_duration['numOfDays']

                temp.append(flight_hour)
                temp.append(flight_minutes)

                timeline = flight_data['legs'][i]
                temp.append(str(timeline['departureTime']['time']))
                temp.append(str(timeline['arrivalTime']['time']))


                flight_info.append(temp)

            X = pd.DataFrame(flight_info, columns = ["Cost", "Distance", "fromLoc", "OriginCode", "toLoc", "DestinCode", "Airline", "Hour", "Min", "timeDepart", "timeArrive"])
            X['Duration'] = X['Hour'] + ':' + X['Min']
            X = X.drop(['Hour', 'Min'], axis = 1)
            X = X.drop_duplicates(subset = ["Cost", "timeDepart", "timeArrive", "Airline"])
            X['timeDepart'] = X['timeDepart'].apply(lambda x: "".join([c for c in x if c not in (":")]))
            X['timeArrive'] = X['timeArrive'].apply(lambda x: "".join([c for c in x if c not in (":")]))
            X = X.sort_values(by = 'Cost', axis = 0)
            X = X.to_json(orient = 'index')
            return X

def main(source, destination, date, pax):
    print(parse(source, destination, date, pax))

if __name__=="__main__":
    argparser = argparse.ArgumentParser()
    argparser.add_argument('source',help = 'Source airport code')
    argparser.add_argument('destination',help = 'Destination airport code')
    argparser.add_argument('date',help = 'MM/DD/YYYY')
    argparser.add_argument('pax',help = 'Number of People')
    args = argparser.parse_args()
    source = args.source
    destination = args.destination
    date = args.date
    pax = args.pax
    main(source, destination,date,pax)
