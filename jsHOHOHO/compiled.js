/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
    let map = {};
    let loop = 0;
    let dis;
    while (loop < nums.length) {
        dis = target - nums[loop];
        if (map[dis] !== undefined) {
            return [map[dis], loop];
        }
        map[nums[loop]] = loop;
        loop++;
    }
};

const fun = () => {
    return 1 + 1;
};

/*****************************************************************************************/

let hehe = twoSum([2, 7, 11, 15], 9);
console.log(hehe);
