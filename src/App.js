import { useState, useRef, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './components/Header';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import Config from './components/Config';
import { chatboxInput, copy } from './utils/services';
import { defaultConfig, CONFIG_KEY } from './utils/const';

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
  const [open, setOpen] = useState(false);
  const input = useRef('');
  const lastInput = useRef('');
  const interval = useRef();

  const getListWithoutKeeping = (l = list) => {
    return l.map(e => {
      if (mode === 'message' && e.keep) {
        return {
          ...e, keep: false,
        };
      }
      return e;
    });
  };

  const handleSend = async (text = '') => {
    if (mode === 'copy') {
      await copy({ text });
    } else {
      clearInterval(interval.current);
      interval.current = null;
      await chatboxInput({
        text, sfx: config.playSound && !!text
      });
      lastInput.current = '';

      if (text && config.keepShowing) {
        interval.current = setInterval(() => {
          chatboxInput({
            text, sfx: false
          });
        }, 10e3);
      }
    }

    const finalList = getListWithoutKeeping();

    if (text) {
      finalList.push({
        text,
        time: new Date(),
        type: mode,
        keep: mode === 'message' && config.keepShowing,
      });
    }
    setList(finalList);
  };

	const handleAction = (action) => {
    if (
      action === 'message' || action === 'copy'
    ) {
      setMode(action);
      return;
    }
    if (action === 'config') {
      setOpen(true);
      return;
    }
  };

  const handleSaveConfig = (config) => {
    setConfig(config);
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  };

  const handleInputChange = (text = '') => {
    input.current = text;
  };

  const clearKeepSending = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
      setList(l => getListWithoutKeeping(l));
    }
  };

  useEffect(() => {
    let realtimeInterval;
    if (mode === 'message' && config.realtimeInput) {
      realtimeInterval = setInterval(() => {
        if (input.current || input.current !== lastInput.current) {
          clearKeepSending();
          chatboxInput({
            text: input.current || '', sfx: false
          });
          lastInput.current = input.current;
        }
      }, 2e3);
    }

    return () => {
      if (realtimeInterval) {
        clearInterval(realtimeInterval);
        realtimeInterval = null;
      }
    };
  }, [config.realtimeInput, mode]);

  useEffect(() => {
    if (!config.keepShowing) {
      clearKeepSending();
    }
  }, [config.keepShowing]);

  useEffect(() => {
    try {
      setConfig({
        ...defaultConfig,
        ...JSON.parse(localStorage.getItem(CONFIG_KEY)),
      });
    } catch (err) {
      console.error('failed to load config', err);
    }

    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        flexGrow={1}
        height="100%"
        flexDirection="column"
        display="flex">
        <Header
          mode={mode}
          onAction={handleAction} />
        <MessageList list={list} />
        <InputArea
          mode={mode}
          sendTyping={mode === 'copy' ? config.showInputIndicatorForClipboard : config.showInputIndicator}
          sendWithEnter={config.sendWithEnter}
          onChange={handleInputChange}
          onSubmit={handleSend} />
        <Config
          open={open}
          value={config}
          onChange={handleSaveConfig}
          onClose={() => setOpen(false)} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
