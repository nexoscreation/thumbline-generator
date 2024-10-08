import chrome from 'chrome-aws-lambda'

const chromeExecPaths: Record < string, string > = {
    win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const exePath = chromeExecPaths[process.platform]

interface Options {
    args: string[]
    executablePath: string
    headless: boolean | 'new'
}

export async function getOptions(isDev: boolean): Promise < Options > {
    if (isDev) {
        return {
            args: [],
            executablePath: exePath,
            headless: 'new'
        }
    } else {
        return {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless
        }
    }
}