import { Component , signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayMinWidthPlugin from '@fullcalendar/scrollgrid'; // Add this line

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      resourceTimeGridPlugin,
      dayMinWidthPlugin
    ],
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next today'
    },
    events:[
      { id: '1', resourceId: 'b', start: '2024-06-21T16:00:00', end: '2024-06-21T16:15:00', description: 'IG 13 B A O O T CHROMATECH', batch: '206631', minutes: 15, squares: 15, squresRemaining: 10 },
    ],
    resources: [
      { id: 'a', title: 'Lisec 1' },
      { id: 'b', title: 'Lisec 2' },
      { id: 'c', title: 'Lisec 3' },
      { id: 'd', title: 'Room D' },
      { id: 'e', title: 'Room E' },
      { id: 'f', title: 'Room F' },
      { id: 'g', title: 'Room G' },
      { id: 'h', title: 'Room H' },
      { id: 'i', title: 'Room I' },
      { id: 'j', title: 'Room J' },
      { id: 'k', title: 'Room K' },
      { id: 'l', title: 'Room L' },
      { id: 'm', title: 'Room M' },
      { id: 'n', title: 'Room N' },
      { id: 'o', title: 'Room O' },
      { id: 'p', title: 'Room P' },
      { id: 'q', title: 'Room Q' },
      { id: 'r', title: 'Room R' },
      { id: 's', title: 'Room S' },
      { id: 't', title: 'Room T' },
      { id: 'u', title: 'Room U' },
      { id: 'v', title: 'Room V' },
      { id: 'w', title: 'Room W' },
      { id: 'x', title: 'Room X' },
      { id: 'y', title: 'Room Y' },
      { id: 'z', title: 'Room Z' }

    ],
    initialView: 'resourceTimeGridDay',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    allDaySlot: false,
    slotDuration: '00:05:00',
    nowIndicator: true,
    stickyHeaderDates: true,
    dayMinWidth: 350,
stickyFooterScrollbar : true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
