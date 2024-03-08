import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import trLocale from '@fullcalendar/core/locales/tr';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import '../Calendar/Calendar.css';
import { Paginate } from '../../models/paginate';
import moment from 'moment';
import GetListSessionResponse from '../../models/responses/session/getListSessionResponse';
import SessionService from '../../services/sessionService';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import GetListUserResponse from '../../models/responses/user/getListUserResponse';
import userService from '../../services/userService';

const Calendar = () => {
  const [sessionWithInstructor, setSessionWithInstructor] = useState<Paginate<GetListSessionResponse>>();
  const [user, setUser] = useState<Paginate<GetListUserResponse>>();
  const [sessions, setSessions] = useState<Paginate<GetListSessionResponse>>();
  const [events, setEvents] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedInstructors, setSelectedInstructors] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const authState = useSelector((state: any) => state.auth);
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const lastPathSegment = pathArray[pathArray.length - 1];

  useEffect(() => {

    const fetchSessions = async () => {
      try {
        const result = await SessionService.getAll(0, 100);
        setSessions(result.data);

        const resultInstructor = await SessionService.getInstructorList(0, 100);
        setSessionWithInstructor(resultInstructor.data);

        const userListResult = await userService.getInstructorList();
        setUser(userListResult.data);

        if (resultInstructor.data) {
          let allSessions = resultInstructor.data.items;

          // Filtreleme işlemleri
          let filteredSessions = [...allSessions];
          if (selectedInstructors.length > 0) {
            filteredSessions = filteredSessions.filter((session) =>
              selectedInstructors.some((instructor: any) => instructor.label.includes(session.accountName))
            );
          }
          if (searchText.trim() !== '') {
            filteredSessions = filteredSessions.filter((session) =>
              session.occupationClassName.toLowerCase().includes(searchText.toLowerCase())
            );
          }
          const currentDate = moment();
          if (selectedFilters.includes('eventEnded')) {
            filteredSessions = filteredSessions.filter(
              (session) => moment(session.startDate).isBefore(currentDate)
            );
          }
          if (selectedFilters.includes('eventContinue')) {
            filteredSessions = filteredSessions.filter(
              (session) => moment(session.startDate).isSameOrAfter(currentDate)
            );
          }
          if (selectedFilters.includes('eventBuyed')) {
            setEvents([]);
            return;
          }
          if (selectedFilters.includes('eventNotStarted')) {
            filteredSessions = filteredSessions.filter(
              (session) => moment(session.startDate).isAfter(currentDate)
            );
          }
          const filteredEvents = filteredSessions.map((session) => ({
            start: moment(session.startDate).format(),
            title: session.occupationClassName,
            id: session.accountName.split(',')[0]
          }));

          setEvents(filteredEvents);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, [searchText, selectedInstructors, selectedFilters]);

  const handleFilterChange = async (filter: string) => {
    let updatedFilters;
    if (selectedFilters.includes(filter)) {
      updatedFilters = selectedFilters.filter((item) => item !== filter);
    } else {
      updatedFilters = [...selectedFilters, filter];
    }
    setSelectedFilters(updatedFilters);
  };

  
  function handleDateSelect(selectInfo: DateSelectArg) {
    let title = prompt('Please enter a new title for your event');
    if (!title) return;
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setEvents([...events, { title: title, ...selectInfo }]);
  }

  const optionsInstructor = (user?.items || []).map((user) => ({
    value: user.id,
    label: user.firstName + " " + user.lastName,
  }));

  return (
    <div className={authState.isAuthenticated && lastPathSegment?.includes("takvim-anasayfa") ? "calendar-page bg-front-dark" : "calendar-page  bg-front-white"}>

      <div className="container filterCommon">
        <div className='row'>
          <h1 className='education' style={{ color: authState.isAuthenticated && lastPathSegment?.includes("takvim-anasayfa") ? "#fff" : "#000" }} >Eğitim ve Etkinlik Takvimi</h1>
        </div>
        <div className='row educationFilter'>
          <div className='educationFilterInput col-md-5'>
            <header>Eğitim Arama</header>
            <input
              type="text"
              id="search-event"
              className="inputEducation"
              placeholder="Eğitim arayın... "
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className='col-md-1'></div>
          <div className='instructorList col-md-5'>
            <header>Eğitmen</header>
            <div>
              <Select
                defaultValue={null}
                isMulti
                name="colors"
                options={optionsInstructor}
                className="instructorSelect"
                classNamePrefix="select"
                placeholder="Eğitmen Seçiniz"
                onChange={(selectedOption) => setSelectedInstructors(selectedOption)}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <header className='educationState'>Eğitim Durumu</header>
            <div className='checkboxList'>
              <span>
                <input
                  className="form-check-input me-2 checkEventEnded"
                  type="checkbox"
                  name="eventEnded"
                  value="eventEnded"
                  onChange={() => handleFilterChange('eventEnded')}
                />
                Bitmiş Dersler
              </span>
              <span>
                <input
                  className="form-check-input me-2 checkEventContinue"
                  type="checkbox"
                  name="eventContinue"
                  value="eventContinue"
                  onChange={() => handleFilterChange('eventContinue')}
                />
                Devam Eden Dersler
              </span>
              <span>
                <input
                  className="form-check-input me-2 checkEventBuyed"
                  type="checkbox"
                  name="eventBuyed"
                  value="eventBuyed"
                  onChange={() => handleFilterChange('eventBuyed')}
                />
                Satın Alınmış Dersler
              </span>
              <span>
                <input
                  className="form-check-input me-2 checkEventNotStarted"
                  type="checkbox"
                  name="eventNotStarted"
                  value="eventNotStarted"
                  color='white'
                  onChange={() => handleFilterChange('eventNotStarted')}
                />
                Başlamamış Dersler
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="card p-5">
          <FullCalendar
            locales={[trLocale]}
            locale="tr"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'today prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            weekends={true}
            events={events}
            dayMaxEvents={true}
            dayMaxEventRows={true}
            select={(arg) => handleDateSelect(arg)}
            eventContent={renderEventContent}
            eventClick={(arg) => console.log(arg)}
            eventsSet={(arg) => console.log(arg)}
          />
        </div>
      </div>
    </div>
  );
};

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <b>{eventInfo.event.title}</b>
      <b>{eventInfo.event.id}</b>
    </>

  );
}

export default Calendar;
