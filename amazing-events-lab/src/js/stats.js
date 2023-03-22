// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderNavigation } from './components/nav-component';
import { getData, getUpcomingPastEvents, getCategories } from './main';

getData().then((data) => {
    // console.log(data);

    let { events, currentDate } = data;
    let upcomingEvents = getUpcomingPastEvents(events, currentDate).upcomingEvents;
    let pastEvents = getUpcomingPastEvents(events, currentDate).pastEvents;

    const CATEGORIES = getCategories(events);

    const statsContent = document.getElementById("statsTable");
    let content = `<h2 class="text-center">Statistical Data</h2>`
    content += evStatsTable("EVENTS STATISTICS", attendancePorc(events));
    content += statsByCategoy("Upcoming events Statistics by category".toLocaleUpperCase(), upcomingEvents, CATEGORIES);
    content += statsByCategoy("Past events Statistics by category".toLocaleUpperCase(), pastEvents, CATEGORIES);
    statsContent.innerHTML = content;
});

renderNavigation("nav");

let evStatsTable = (caption, data) => {
    let content = `
            <table class="staTable mx-2 my-5 table table-bordered border-primary caption-top">
                <caption>${caption}</caption>
                <thead>
                    <tr>
                        <td class="col-4">Events with the highest percentage of attendance</td>
                        <td class="col-4">Events with the lowest percentage of attendance</td>
                        <td class="col-4">Event with larger capacity</td>
                    </tr>
                </thead>
                <tbody>        
                    <tr>
                        <td>${data[0].name} (${data[0].percentage}%)</td>
                        <td>${data[1].name} (${data[1].percentage}%)</td>
                        <td>${data[2].name} (${data[2].capacity})</td>
                    </tr>
                </tbody>
            </table> `;

    return content;
};

const statsByCategoy = (caption, data, categories) => {
    let content = `
            <table class="staTable mx-2 my-5 table table-bordered border-primary caption-top">
                <caption>${caption}</caption>
                <thead>
                    <tr>
                        <td class="col-4">Categories</td>
                        <td class="col-4">Revenues</td>
                        <td class="col-4">Percentage of attendance (Total/Cat)</td>
                    </tr>
                </thead>
                <tbody>        
                    ${byCategories(data, categories)}        
                </tbody>
            </table> `;

    return content;
};

const byCategories = (events, categories) => {
    let content = '<tr>';
    categories.forEach(category =>{
        let eventsCat = events.filter(event=>event.category==category);
        // console.log(eventsCat);
        
        let param = Object.hasOwn(events[0], 'estimate') ? "estimate" : "assistance";
        let  totalAtt = eventsCat.map(event=>event[param]).reduce((acc,act)=>acc+act,0);            
        // console.log(totalAtt);
        
        let totalCapac = eventsCat.map(event=>event.capacity).reduce((acc,act)=>acc+act,0);
        content += `<td>${category}</td>
                    <td>${eventsCat.length != 0 ? 
                        formatOutput(eventsCat) : 
                        "No event in this Category."}
                    </td>                        
                    <td>${totalAtt!=0 ? (totalAtt/totalCapac*100).toFixed(2)+`%`  : ""}</td>
                    </tr>`; 
    });
      return content;
};

const formatOutput = (events) => {
    let totalEst = 0;
    let total = events.map(event=>event.price*event.capacity).reduce((acc,act)=>acc+act,0);
    if (Object.hasOwn(events[0], 'estimate')){
        totalEst = events.map(event=>event.price*event.estimate).reduce((acc,act)=>acc+act,0);            
        // console.log(totalEst);
    } else {
        total = events.map(event=>event.price*event.assistance).reduce((acc,act)=>acc+act,0);
    }
    if (totalEst==0 || totalEst == total){
        return `$${total}`;
    } else {
        return `$${totalEst} ---  (Max Rev: $${total})`;
    }
};

const percentage = (actual, expected) => {
    return actual/expected*100;
};


const attendancePorc = (events) => {
    let [highest, lowest, highestCap] = [events[0], events[0], events[0]];
    events.forEach((event) => {
        if (percentage(event.assistance, event.capacity) > percentage(highest.assistance, highest.capacity)) highest = event;
        if (percentage(event.assistance, event.capacity) < percentage(lowest.assistance, lowest.capacity)) lowest = event;
        if (event.capacity > highestCap.capacity) highestCap = event;
    });
    return [
        { name: highest.name, percentage: percentage(highest.assistance, highest.capacity).toFixed(2) },
        { name: lowest.name, percentage: percentage(lowest.assistance, lowest.capacity).toFixed(2) },
        highestCap];
};