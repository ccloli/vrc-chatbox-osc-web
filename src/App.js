import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './components/Header';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import { chatboxInput, copy } from './utils/services';
import { defaultConfig } from './utils/const';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#0e1621',
      default: '#17212b',
    }
  },
});

function App() {
  const [list, setList] = useState([]);
  const [mode, setMode] = useState('message');
  const [config, setConfig] = useState(defaultConfig);

  const handleSend = async (text) => {
    if (mode === 'copy') {
      await copy({ text });
    } else {
      await chatboxInput({
        text, sfx: config.playSound
      });
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
        height="100%"
        flexDirection="column"
        display="flex">
        <Header
          mode={mode}
          onModeChange={setMode} />
        <MessageList list={list} />
        <InputArea
          mode={mode}
          sendTyping={config.showInputIndicator}
          sendByEnter={config.sendByEnter}
          onSubmit={handleSend} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
