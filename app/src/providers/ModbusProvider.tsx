import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import DirectoryService from '../services/DirectoryService';
import { useAuthContext } from './AuthProvider';

export interface ModbusContextType {
  modbusDirectory: any
}

const ModbusContext = createContext<ModbusContextType | undefined>(undefined);

export const useModbusContext = (): ModbusContextType => {
  const context = useContext(ModbusContext);
  if (context === undefined) {
    throw new Error('ModbusProvider: useModbusContext must be within ModbusProvider');
  }

  return context;
};

const ModbusProvider = (props: { children: React.ReactNode }): React.ReactElement => {
  const [modbusDirectoryId, setModbusDirectoryId] = useState('');
  const [modbusDirectory, setModbusDirectory] = useState(null);
  const { requestHeaders } = useAuthContext();
  const { children } = props;

  useEffect(() => {
    const initModbusDirectory = async () => {
      try {
        if (requestHeaders.Authorization !== 'Bearer ') {
          if (modbusDirectoryId) {
            // Retrieves modbus directory
            const data = await DirectoryService.getModbusDirectory(modbusDirectoryId, requestHeaders);
            setModbusDirectory(data);
          } else {
            // Retrieves modbus directory id
            const id = await DirectoryService.getModbusDirectoryId(requestHeaders);
            setModbusDirectoryId(id);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    void initModbusDirectory();
  }, [modbusDirectoryId, requestHeaders]);

  const addModbusStream = async (data) => {
    await DirectoryService.addModbusStream(data, requestHeaders)
  }

  const contextValue = useMemo(() => ({ modbusDirectory }), [modbusDirectory]);

  return (
    <ModbusContext.Provider value={contextValue}>
      {children}
    </ModbusContext.Provider>
  );
};

export default ModbusProvider;
