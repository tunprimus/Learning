//@ts-check

/**
 * @description Find meeting time slots where all participants are available
 * Given time schedules in the form of (startTime - endTime) of n people, print all time intervals where all n participants are available. It's like a meeting application suggesting possible time when we can do a company meeting when all employees are free
 * @author Velu S Gautam
 * @link https://www.hectane.com/blog/meeting-when-all-people-free
 */

const MIN_HOUR = 0;
const MAX_HOUR = 24;

/**
 * 
 * @param {array} allPeople 
 * @returns {string[]}
 */
function getFreeMeetingTime(allPeople) {
	const allTimeSlotsInDay = getAllTimeSlots();
	let tempResult = [];

	for (const person of allPeople) {
		for (const time of person) {
			for (let i = Number(time.split('-')[0]); i < Number(time.split('-')[1]); i++) {
				const val = `${i}-${i + 1}`;
				if (!tempResult.includes(val)) {
					tempResult.push(val);
				}
			}
		}
	}
	// Merge the times in between. e,g, '4-5', '5-6' to '4-6'
	return mergeTime(allTimeSlotsInDay.filter((time) => !tempResult.includes(time)));
}

/**
 * 
 * @param {array} timeArray 
 * @returns {string[]}
 */
function mergeTime(timeArray) {
	const result = [];
	let i = 0;

	while (i < timeArray.length) {
		const arr = timeArray[i].split('-');
		let start = Number(arr[0]);
		let end = Number(arr[1]);
		let counter = 0;

		for (let j = i + 1; j < timeArray.length; j++) {
			const jArr = timeArray[j].split('-');
			const jStart = Number(jArr[0]);
			const jEnd = Number(jArr[1]);

			if (end === jStart || end >= jStart) {
				end = jEnd;
				counter++;
			}
		}

		i = counter === 0 ? ++i : counter + 1;
		result.push(`${start}-${end}`);
	}
	return result;
}

/**
 * 
 * @returns {string[]}
 */
function getAllTimeSlots() {
	const result = [];
	for (let i = MIN_HOUR; i < MAX_HOUR; i = i + 1) {
		result.push(`${i}-${i + 1}`);
	}
	return result;
}

/**
 * Creating a sample data to test
 */
// Sample time slots of persons when they are busy
const person_1 = ['4-16', '18-24'];
const person_2 = ['2-14', '17-24'];
const person_3 = ['6-8', '12-20'];
const person_4 = ['10-22'];

// Getting an array of time schedules where people are busy.
const allPeople = [person_1, person_2, person_3, person_4];

// Get back the calculated result
const freeTimeResult = getFreeMeetingTime(allPeople);
console.log(freeTimeResult);
