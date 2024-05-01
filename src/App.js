import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './components/Header';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import { chatboxInput, copy } from './utils/services';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#0e1621',
      default: '#17212b',
    }
  },
});

console.log(darkTheme);

function App() {
  const [list, setList] = useState([]);
  const [mode, setMode] = useState('message');

  const handleSend = async (text) => {
    if (mode === 'copy') {
      await copy({ text });
    } else {
      await chatboxInput({ text });
    }

    if (text) {
      setList([
        ...list,
        {
          text, time: new Date(), type: mode,
        }
      ]);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        flexGrow={1}
        height="100vh"
        flexDirection="column"
        display="flex">
        <Header
          mode={mode}
          onModeChange={setMode} />
        <MessageList list={list} />
        <InputArea
          mode={mode}
          onSubmit={handleSend} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
