function padTwoDigits(num: number) {
    return num.toString().padStart(2, "0");
}

export function dateFormatDataTable(date: Date, dateDiveder: string = ".") {
    return (
        [date.getFullYear(), padTwoDigits(date.getMonth() + 1), padTwoDigits(date.getDate()),].join(dateDiveder) +
        " " +
        [
            padTwoDigits(date.getHours()),
            padTwoDigits(date.getMinutes()),
//            padTwoDigits(date.getSeconds()),
        ].join(":")
    );
}
