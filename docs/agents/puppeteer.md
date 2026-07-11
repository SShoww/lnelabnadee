# Puppeteer Configuration

To run Puppeteer tools on this system, you must use Brave Browser as the browser executable.

## Executable Path

The executable path is:
`C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`

## Usage in Puppeteer launchOptions

Always specify the `executablePath` in `launchOptions` when calling Puppeteer navigate tools:

```json
{
  "launchOptions": {
    "headless": true,
    "executablePath": "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
  }
}
```
