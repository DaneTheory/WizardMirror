time();
function time() {
    const jsonfile = require('jsonfile');
    jsonfile.readFile("apps.json", function (err, obj) {
        if (err) console.error(err);
        const appList = obj.apps;
        for (let i = 0; i < appList.length; i++) {
            if (appList[i].name == "Time") {
                const dta = obj.apps[i].config;
                const timeDiv = document.getElementById(dta.div);
                const showSeconds = dta.showseconds;
                const twentyFourHourClock = dta.twentyfourhourclock;

                var date = new Date();
                var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var day = dayList[date.getDay()];
                var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var month = monthList[date.getMonth()];
                var year = date.getFullYear();
                var dateNumb = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();

                var dateText = document.createElement("h1"); dateText.className = "dateTime";
                timeDiv.appendChild(dateText);
                var timeText = document.createElement("h1"); timeText.className = "timeText";
                timeDiv.appendChild(timeText);
                var ampm = document.createElement("h1"); ampm.className = "ampm";
                timeDiv.appendChild(ampm);

                update();

                function update() {
                    date = new Date();
                    dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    day = dayList[date.getDay()];
                    monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    month = monthList[date.getMonth()];
                    year = date.getFullYear();
                    dateNumb = date.getDate();
                    hours = (twentyFourHourClock ? date.getHours() : (date.getHours() > 12 ? date.getHours() - 12 : (date.getHours() === 0 ? 12 : date.getHours())));
                    minutes = date.getMinutes();
                    seconds = date.getSeconds();
                    var timeString = hours + ":" + (minutes > 9 ? minutes : "0" + minutes) + (showSeconds ? ":" + (seconds > 9 ? seconds : "0" + seconds) : "");
                    timeText.innerHTML = "";
                    timeText.appendChild(document.createTextNode(timeString));
                    var dateString = day + ", " + month + " " + dateNumb + ", " + year;
                    dateText.innerHTML = "";
                    dateText.appendChild(document.createTextNode(dateString));
                    var ampmString = (date.getHours() > 11 ? "PM" : "AM");
                    if (!twentyFourHourClock) {
                        ampm.innerHTML = "";
                        ampm.appendChild(document.createTextNode(ampmString));
                    }

                    setTimeout(arguments.callee, 10); // Loop every 10 milliseconds
                }


            }
        }
    });


}