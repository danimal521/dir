import React from 'react';
import { Stack, Text, Link, FontWeights } from 'office-ui-fabric-react';

import logo from './fabric.png';
import EmployeeSearch from './Components/EmployeeSearch';

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export const App: React.FunctionComponent = () => {
  return (
    <Stack    
      styles={{
        root: {
          width: '960px',
          margin: '0 auto',
          color: '#605e5c'
        }
      }}
      gap={15}
    >
      <EmployeeSearch></EmployeeSearch>
    </Stack>
  );
};
