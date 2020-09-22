const url = `http://localhost:8000/api/slots`;
let datas = null;
let flag1 = false, flag2 = false;

const fetchData = () => {
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        fillCourseData(data);
    })
}

window.onload = () => {
    fetchData();
}

const fillCourseData = (data) => {
    datas = data;
    data.sort(function(a, b){return a.course_id - b.course_id});
    const courseData = 
    `   
        <option>Select Course(s)</option>
        <option>${data[0].course_name}</option>
        <option>${data[1].course_name}</option>
        <option>${data[2].course_name}</option>
        <option>${data[3].course_name}</option>
        <option>${data[4].course_name}</option>
        
    `
    document.getElementById('courses').innerHTML = courseData;
    
}

const setDates = () => {
    if(!flag1)
        fillDateSlot(datas);
}

const setTimeSlots = () => {
    if(!flag2)
        fillTimeSlot(datas);
}

const fillDateSlot = (data) => {
    flag1 = true;
    const course = document.getElementById('courses').value;
    const courseDetails = data.find((e) => e.course_name == course);
    if(courseDetails == null){
        alert("First select a course!!");
        return;
    }
    const courseSlots = courseDetails.slots;
    let courseDates = `<option>Select Date(s)</option>`;
    courseSlots.map((courseSlot) => {
        const unixDate = courseSlot.slot;
        const realDate = new Date(parseInt(unixDate)).toString();
        courseDates += `<option>${realDate.substring(0, 15)}</option>`;
    })
    document.getElementById('date-slots').innerHTML = courseDates;
}

const fillTimeSlot = (data) => {
    flag2 = true;
    const course = document.getElementById('courses').value;
    const courseDetails = data.find((e) => e.course_name == course);
    if(courseDetails == null){
        alert("First select a course!!");
        return;
    }
    const courseSlots = courseDetails.slots;
    let courseDates = `<option>Select Time Slot(s)</option>`;
    courseSlots.map((courseSlot) => {
        const unixDate = courseSlot.slot;
        const realDate = new Date(parseInt(unixDate)).toString();
        courseDates += `<option>${realDate.substring(16)}</option>`;
    })
    document.getElementById('time-slots').innerHTML = courseDates;
}


