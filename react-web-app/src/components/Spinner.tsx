import * as React from 'react';

export const Spinner: React.FC = () => (
  <div
    style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Loading…
  </div>
);
