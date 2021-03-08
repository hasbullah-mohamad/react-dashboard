import moment from 'moment';
import { hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import _ from 'lodash';

export default {
    makeHoursForDayPerProject: (events, randomColors) => {

        const dateArray = [];
        events.forEach(e => {
            let str = moment(e.start).format('D/M/YYYY');
            e['dateStr'] = str;
            if (!dateArray.includes(str)) { dateArray.push(str) }
            return e;
        });
        const trackedProjects = [];
        events.forEach(e => {
            let project = e.projectNested;
            let already = false;
            for (let i=0; i<trackedProjects.length; i++) {
                if (trackedProjects[i].id === project.id) {
                already = true; break;
                }
            }
            if (!already) trackedProjects.push(project);
        })

        const projectHoursChart = {
            labels: trackedProjects.map(p => p.name),
            datasets: dateArray.map((d, idx) => {
                return {
                label: d,
                backgroundColor: hexToRgba(randomColors[idx % randomColors.length], 10),
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: []
                }
            })
        }

        const groupedBydate =  _.groupBy(events, 'dateStr');
        Object.keys(groupedBydate).forEach((dateKey, dateIdx ) => {  // per date
            const data = groupedBydate[dateKey];
            const groupedByProject = _.groupBy(data, 'project');
            trackedProjects.forEach(project => {  // per project
                let totalMinutesForThisDay = 0;
                if (groupedByProject[project.id]) {
                    groupedByProject[project.id].forEach(project1 => {  // for sum matched minutes
                        totalMinutesForThisDay += project1.minutes;
                    });
                }
                projectHoursChart.datasets[dateIdx].data.push(totalMinutesForThisDay);
            });
        });
        return projectHoursChart;
    },

    makeHoursForProjectPerDay: (events, randomColors) => {

        const dateArray = [];
        events.forEach(e => {
            let str = moment(e.start).format('D/M/YYYY');
            e['dateStr'] = str;
            if (!dateArray.includes(str)) { dateArray.push(str) }
            return e;
        });

        const trackedProjects = [];
        events.forEach(e => {
            let project = e.projectNested;
            let already = false;
            for (let i=0; i<trackedProjects.length; i++) {
                if (trackedProjects[i].id === project.id) {
                already = true; break;
                }
            }
            if (!already) trackedProjects.push(project);
        });

        const projectHoursChart = {
            labels: dateArray,
            datasets: trackedProjects.map((d, idx) => {
                return {
                label: d.name,
                backgroundColor: hexToRgba(randomColors[idx % randomColors.length], 10),
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: []
                }
            })
        }
        const groupedByProject = _.groupBy(events, 'project');
        trackedProjects.forEach((project, prjIdx) => {  // per project
            const data = groupedByProject[project.id];
            const groupedByDate = _.groupBy(data, 'dateStr');
            dateArray.forEach(dateStr => {  // per date
                let totalMinutesForThisDay = 0;
                if (groupedByDate[dateStr]) {
                    groupedByDate[dateStr].forEach(event1 => {
                        totalMinutesForThisDay += event1.minutes;
                    })
                }
                projectHoursChart.datasets[prjIdx].data.push(totalMinutesForThisDay);
            });
            
        })
        return projectHoursChart;
    },
}