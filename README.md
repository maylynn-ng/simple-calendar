# 📆 "Simple" Calendar App

The task was to create a "simple" calendar app using React.

![Screenshot of calendar](/public/screenshot-1.png)

## 🏃‍♀️ Running locally

- clone the repo `git clone https://github.com/maylynn-ng/simple-calendar.git`
- navigate into the app `cd simple-calendar`
- install using yarn `yarn install`
- start & get planning! `yarn start`

## 💪 Features Implemented

- Weekly calendar view
- Users can navigate across weeks
- Users can create single day events
- Users can edit events
- Events handle overlap

- Marker indicating the current day and time 📍 (see below for pic!)
- "Today" button to navigate back to the current day

## 🥵 Hurdles

- Deciding how to place the events on the page.
  🙅‍♀️ Grid?
  🙅‍♀️ Flexbox?
  💁‍♀️ Plain css with absolute positioning
- Surprisingly tricky... handling what datatype to format the date in.
  - Datetime inputs likes visually appealing strings, doing anything else with calculating times does not 🙃
- Timeframe. This feels like a big old task for 3 hours!

## 🤔 What I would have liked to do with more time

- Testing. 100% testing!! This was number one on my list, though to stick to the timeframe given to me I had to opt for the required features instead 😢
- Styling. ✨ I'm not going to pretend that this calendar is at all beautiful. I would have loved to spend more time sorting out the scrolling, autoscroll to the 'right now' marker, having a proper colour scheme, having coloured events, generally just not an eyesore. The size of the app however meant I had to make the choice between this and features.
- DARK MODE!!!! 🌚 Would have been very cool to implement this! I had even set up a global theme with styled components to make this a nice easy bonus once I had everything done. Though probably to get this right I would have had to have some actual nice styling 😬
- There were a bunch of other smaller features I would have liked to have had time for, eg.
  - click on a time on the grid to create an event then (like in google calendar)
  - delete an event
  - add a colour picker to the events
  - add a little month view to the side
  - have 'all day' events
  - close the modals when you click outside of it

![Screenshot of today marker](/public/screenshot-2.png)
