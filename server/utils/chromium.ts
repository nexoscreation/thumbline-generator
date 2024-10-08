import puppeteer, { Browser, Page } from 'puppeteer-core'
import { getOptions } from './chromiumOpts'

let browser: Browser | null = null

async function getBrowser(isDev: boolean): Promise < Browser > {
    if (browser) {
        return browser
    }

    const options = await getOptions(isDev)
    browser = await puppeteer.launch(options)

    return browser
}

export async function getScreenshot(html: string, isDev: boolean): Promise < Buffer > {
    const browser = await getBrowser(isDev)
    const page = await browser.newPage()

    try {
        await page.setViewport({ width: 2048, height: 1170 })
        await page.setContent(html, { waitUntil: 'networkidle0' })

        const file = await page.screenshot({ type: 'png' })

        return file
    } finally {
        await page.close()
    }
}

export async function closeBrowser(): Promise < void > {
    if (browser) {
        await browser.close()
        browser = null
    }
}