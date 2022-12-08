import path from 'path';
import { BrowserWindow, app, session, screen, nativeTheme, ipcMain, Tray } from 'electron';

import { reloader } from './reloader';

const URL_SIGN_IN = 'https://www.channel4.com/sign-in-or-register';
const URL_MAIN_PAGE = 'https://www.channel4.com/';

if (process.env.NODE_ENV === 'development') {
  reloader({
    mainPaths: ['dist/main.js', 'dist/preload.js'],
    rendererPaths: ['dist/index.html', 'dist/app.js', 'dist/app.css'],
  });
}

app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().size;
  const browserWindowWidth = width > 1024 ? 1024 : width;
  const browserWindowHeight = height > 768 ? 768 : height;
  const appIcon = new Tray(__dirname + '/icons/png/1024x1024.png')
  const mainWindow = new BrowserWindow({
    icon: __dirname + '/icons/png/1024x1024.png',
    width: browserWindowWidth,
    height: browserWindowHeight,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
    fullscreenable: true,
  });
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile('dist/index.html');
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setMenu(null);

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors;
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  });
  /*
    ipcMain.handle('continue', () => {
      session.defaultSession.cookies.get({ url: URL_MAIN_PAGE })
      .then((cookies) => {
        const sessionCookie = cookies.find(cookie => cookie.name === '4id_Identity');
        if (sessionCookie) {
          mainWindow.loadURL(URL_MAIN_PAGE);
        } else {
          mainWindow.loadURL(URL_SIGN_IN);
        }
      }).catch((error) => {
        mainWindow.loadURL(URL_MAIN_PAGE);
      })
    });  
    */

  // Query all cookies associated with a specific url.
  /*
  session.defaultSession.cookies.get({ url: URL_MAIN_PAGE })
    .then((cookies) => {
      const sessionCookie = cookies.find(cookie => cookie.name === '4id_Identity');
      if (sessionCookie) {
        mainWindow.loadURL(URL_MAIN_PAGE);
      } else {
        mainWindow.loadURL(URL_SIGN_IN);
      }
    }).catch((error) => {
      mainWindow.loadURL(URL_MAIN_PAGE);
    })
    */
});

app.once('window-all-closed', () => app.quit());
