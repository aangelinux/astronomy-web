# Assignment WT - Web for Data Science
# Astronomy Dashboard
  
## Dataset  
  
This application visualizes a dataset containing information on 16 000+ Near-Earth Objects (NEOs); that is, asteroids or comets that have been designated by NASA to orbit close enough to Earth to pose a potential collision danger. Each Near-Earth Object contains a set of attributes describing its physical properties, as well as data describing its orbit around the Sun and records of close approach events-where it orbited particularly close to Earth's orbit.  
  
Additionally, the application has a separate page with a table contaning all NEOs from the database for convenient browsing.  

## Features
  
The application allows users to select any NEO from the database using a search bar. A list of the NEO's attributes and a 3D view of its orbit will be displayed on the dashboard.  
  
In addition, if the NEO has previously made any close approaches to Earth, the timeline will be updated to display these events. If no past approaches has been made by the selected NEO, the timeline will still be available for browsing; users can select any year to view all approaches made by other NEOs during that year.  
  
## AI/ML Feature
  
The application uses Google's Gemini API to dynamically generate a description of the user's selected Near-Earth Object based on its attributes, orbit data, and potential close approach-events. 
  
## Deployed Application

> URL: ...

## Requirements

### Functional Requirements

| Requirement                                                                        | Issue                  | Status               |
| ---------------------------------------------------------------------------------- | ---------------------- | -------------------- |
| API Integration — the app consumes your WT1 API                                    | [#14](../../issues/14) | :white_check_mark: |
| OAuth Authentication — users log in via OAuth 2.0                                  | [#15](../../issues/15) | :white_check_mark: |
| Interactive data visualization with aggregation/adaptation for 10 000+ data points | [#11](../../issues/11) | :white_check_mark: |
| Efficient loading — pagination, lazy loading, loading indicators                   | [#13](../../issues/13) | :white_check_mark: |

### Non-Functional Requirements

| Requirement                                   | Issue                | Status               |
| --------------------------------------------- | -------------------- | -------------------- |
| Clear and well-structured code                | [#1](../../issues/1) | :white_check_mark: |
| Code reuse                                    | [#2](../../issues/2) | :white_check_mark: |
| Dependency management and scripts             | [#3](../../issues/3) | :white_check_mark: |
| Source code documentation                     | [#4](../../issues/4) | :white_check_mark: |
| Coding standard                               | [#5](../../issues/5) | :white_check_mark: |
| Examiner can follow the creation process      | [#6](../../issues/6) | :white_check_mark: |
| Publicly accessible over the internet         | [#7](../../issues/7) | :white_check_mark: |
| Keys and tokens handled correctly             | [#8](../../issues/8) | :white_check_mark: |
| Complete assignment report with correct links | [#9](../../issues/9) | :white_check_mark: |

### VG — AI/ML Feature

| Option                                                        | Status               |
| ------------------------------------------------------------- | -------------------- |
| Text Summarization / Generation — LLM-powered summaries       | :white_check_mark:   |

## Core Technologies Used

| Layer             | Technologies                                                             |
| ----------------- | -----------------------------------------------------------------------  |
| **Visualization** | D3.js & Three.js                                                         |
| **Front-end**     | React & MUI Materials                                                    |
| **Styling**       | Vanilla CSS & MUI Materials                                                      |

## How to Use

_Explain how to interact with your visualization (controls, filters, etc.). Screenshots/gifs are encouraged._
