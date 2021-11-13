import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt, faLink } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { useAuthContext } from '../../providers/AuthProvider';
import CSVParser from '../../components/CSVParser';
import { useModbusContext } from '../../providers/ModbusProvider';

const GLIDE_AWAY = 'http://localhost:3000';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    width: '360px',
    maxWidth: '100%',
  },
};

Modal.setAppElement('#root');

const Home = ({
  devicesDirectoryId,
  devicesStreamId,
  sensorsDirectoryId,
}) => {
  const [devices, setDevices] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deviceName, setDeviceName] = useState('Modbus Device');
  const [devicePort, setDevicePort] = useState<number |string>(5020);
  const [deviceEnvironment, setDeviceEnvironment] = useState('localhost');
  const [deviceReadInterval, setDeviceReadInterval] = useState<number |string>(5000);
  const [submitText, setSubmitText] = useState<ReactElement | string>('Send');
  const success = () => toast('Wow so easy!');
  const duplicateName = () => toast('Name of device already exists, please try a different name!');
  const { modbusDirectory } = useModbusContext()

  useEffect(() => {
    if (modbusDirectory) {
      const devicesList = modbusDirectory.stream.map((device) => ({ status: true, ...device }));

      setDevices(devicesList);
    }
  }, [modbusDirectory]);

  const generateDevices = () => {
    const deviceList: unknown[] = [];

    devices.map((device: any, idx) => deviceList.push(
      <tr key={idx}>
        <td>
          <a
            href={`https://app.facility-ops.com/dashboard/directory/${sensorsDirectoryId}`}
          >
            {device.deviceName}
            {' '}
            <FontAwesomeIcon
              icon={faLink}
              className="fa fa-link"
            />
          </a>
        </td>
        <td>{device.deviceReadInterval}</td>
        <td>
          {device.deviceEnvironment}
          :
          {device.devicePort}
        </td>
        <td className="online">online</td>
      </tr>,
    ));

    return (
      <table>
        <thead>
          <tr>
            <td>Device Name</td>
            <td>Read Interval (ms)</td>
            <td>Connection</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>{deviceList}</tbody>
      </table>
    );
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSubmitText('Send');
  };

  const handleDeviceName = (event) => {
    event.preventDefault();
    const isDuplicate = devices.some(
      (device: any) => device.deviceName === event.target.value,
    );

    if (!isDuplicate) setDeviceName(event.target.value);
    else duplicateName();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitText(
      <FontAwesomeIcon icon={faSyncAlt} className="fa fa-spinner" />,
    );

    await axios
      .post(
        `${GLIDE_AWAY}/api/modbus/add`,
        {
          devices_stream_id: `${devicesStreamId}`,
          sensors_directory_id: `${sensorsDirectoryId}`,
          data: {
            deviceName: `${deviceName}`,
            deviceReadInterval: Number(deviceReadInterval),
            devicePort: Number(devicePort),
            deviceEnvironment: `${deviceEnvironment}`,
            deviceNumber: Number(devices.length),
          },
        },
        {

        },
      )
      .then((response) => response.data)
      .catch((error) => console.error(error));

    const devicesList = await axios
      .get(
        `${GLIDE_AWAY}/api/stream/dataset/${devicesStreamId}?span=raw&time_scale=1m&ts_type=skewness`,
        {

        },
      )
      .then((response) => response.data)
      .catch((error) => console.error(error));

    devicesList.map((device) =>
    // if (device.deviceName === deviceName)
    //     return { status: true, ...device };
      ({ status: true, ...device }));

    await setDevices(devicesList);

    closeModal();
    success();
  };

  return (
    <main className="dashboard">
      <section className="dashboard__heading">
        <h2 className="dashboard__heading__title">Modbus Devices</h2>
        <button
          className="dashboard__heading__icon"
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add New Device Modal"
        >
          <div className="modal__header">
            <h2>Add New Device</h2>
            <button onClick={closeModal}>close</button>
          </div>
          <div className="bar" />
          <form className="modal__form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                value={deviceName}
                type="text"
                onChange={handleDeviceName}
              />
            </div>
            <div>
              <label htmlFor="interval">Read Interval</label>
              <input
                id="interval"
                value={deviceReadInterval}
                type="number"
                onChange={(event) => setDeviceReadInterval(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="port">Port</label>
              <input
                id="port"
                value={devicePort}
                type="number"
                onChange={(event) => setDevicePort(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="environment">IP Address</label>
              <input
                id="environment"
                value={deviceEnvironment}
                type="text"
                onChange={(event) => setDeviceEnvironment(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="modbusId">Modbus ID</label>
              <input
                id="modbusId"
                value={'123'}
                type="number"
                onChange={(event) => setDeviceEnvironment(event.target.value)}
              />
            </div>
            <CSVParser />
            <button style={{ marginTop: '10px' }} type="submit">{submitText}</button>
          </form>
        </Modal>
      </section>

      <div className="bar" />
      <section className="dashboard__devices">
        {generateDevices()}
      </section>
      <ToastContainer />
    </main>
  );
};

export default Home;
