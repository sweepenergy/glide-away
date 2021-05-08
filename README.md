# Glide Away

Sweep Energy develops IoT hardware and software technologies for use in commercial/industrial settings. Using their Sweep API (an API that allows the facilitation of reading metric data from different devices to create time-series aggregations of all data collected) it is now easier to bridge the gap between using cloud-based monitoring solutions for time-series data. Our solution allows a user to easily connect their data with the facility operations that Sweep uses to seamlessly add/track Modbus devices, view individual device data, and ensure the information on our platform matches the information on Sweeps own facility operation platform.

## Quick Start

--------

### [Facility Ops](https://app.facility-ops.com/login)

Make sure to create an account because you won't be able to log into this app without an account.

### Pull the docker image

```bash
$ docker pull docker.pkg.github.com/sweepenergy/glide-away/glide_away:1.0.0
1.0.0: Pulling from sweepenergy/glide-away/glide_away
...
```

### Run the app locally

```bash
$ docker run -dp 3000:3000 docker.pkg.github.com/sweepenergy/glide-away/glide_away:1.0.0
8a37692f288e153ea164ca6bcacf0d6754a36ecad1cd69b892629334259c959f
```

### Do you need some test Modbus devices to experiment with?

We set up a docker-compose.yml file for you based on [oitc/modbus-server](https://hub.docker.com/r/oitc/modbus-server)

> Note that if you use the docker simulators then you will need to type in "host.docker.internal" for the environment
            
To run the follow docker-compose.yml file type this in the terminal `docker compose up -d`

```yml
version: "3.8"

services:
    modbus_server1:
        container_name: modbus_server1
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5020:5020"

    modbus_server2:
        container_name: modbus_server2
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5021:5020"

    modbus_server3:
        container_name: modbus_server3
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5022:5020"

    modbus_server4:
        container_name: modbus_server4
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5023:5020"
    
    modbus_server5:
        container_name: modbus_server5
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5024:5020"

    modbus_server6:
        container_name: modbus_server6
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5025:5020"

    modbus_server7:
        container_name: modbus_server7
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5026:5020"

    modbus_server8:
        container_name: modbus_server8
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5027:5020"

    modbus_server9:
        container_name: modbus_server9
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5028:5020"

    modbus_server10:
        container_name: modbus_server10
        image: oitc/modbus-server
        restart: always
        command: -f /server_config.json
        volumes:
            - ./server_config.json:/server_config.json
        ports:
            - "5029:5020"
```