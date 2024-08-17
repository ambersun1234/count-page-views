# Count Page Views
This repo is a simple backend server that retrieve the page count using [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1?hl=zh-tw)

## Prerequisites
+ Enable [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1?hl=zh-tw)
+ Enable Google Analytics and have some page view data

## Environment Variables
copy [.env.example](./.env.example) to `.env` and fill in the following variables

| Name | Description |
|:--|:--|
| GOOGLE_APPLICATION_CREDENTIALS | Path to the Google Cloud credential file |
| ID | Google Analytics View ID |
| DOMAIN | Domain name of the website |
| START_DATE | Start date of the query |

## Features
+ Aggregate page view count (include redirect URL)
+ Easy deployment with Kubernetes(Helm Chart)

## Author
+ [ambersun1234](https://github.com/ambersun1234)

## License
This project is licensed under Apache 2.0. See the [LICENSE](./LICENSE) file for details.
