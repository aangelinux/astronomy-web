# Assignment WT - Web for Data Science
# Astronomy Dashboard
  
## Dataset  
  
This application visualizes a dataset of 16 000+ Near-Earth Objects (NEOs), meaning asteroids or comets that have been designated by NASA to orbit close enough to Earth to pose a potential collision danger. Each NEO has a set of attributes describing its physical properties, data describing its orbit around the Sun, and possibly records of close approach events (to Earth).  
  
The application also has a separate page with a table containing all NEOs from the database for browsing.  

## Features
  
The application allows users to select any NEO from the database using a search bar. A list of the NEO's attributes and a 3D view of its orbit around the Sun will be displayed, with Earth's orbit alongside it for reference.  
  
A timeline of close approach events between 1900-2026 from NASA's database can be used to view all events during a chosen year. It's a scatterplot where the x-axis represents time and the y-axis represents distance from Earth. Hovering over an event renders a hoverbox with its data.
  
If a selected NEO has previously made any close approaches to Earth, the timeline will be updated to highlight this event.  
  
## AI/ML Feature
  
The application uses Google's Gemini API to dynamically generate a description of the user's selected NEO based on its data.  
  
## Deployed Application

> URL: [Astronomy Dashboard](https://astronomy-web-production.up.railway.app/)

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

The NEOs page, which can be accessed from the navigation bar, displays a table of all NEOs in the database along with their physical properties.  
  
To view the data on the Dashboard, users can select a Near-Earth Object in the search bar. It has an autocomplete feature so it's not necessary to know the full names of the objects.  
  
When a NEO is selected, the Orbit View will render an interactive 3D view of its orbit around the Sun. The view can be dragged, tilted, and zoomed in/out.  
  
If the NEO has one or more close approaches recorded in their data, the Timeline will display the year of the approach and highlight the event.  
  
The timeline can be interacted with on its own without selecting a NEO, by using the pagination buttons or the search bar. Hovering over an event will display a hoverbox with event data.  
  
### Screenshots

![App_1](/images/neoApp_1.png)  
  
![App_2](/images/neoApp_2.png)  
  
![App_3](/images/neoApp_3.png)  
  