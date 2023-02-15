/* Write a loop that makes seven calls to console.log to output the following triangle:
#
##
###
####
#####
######
#######
*/

for (let pattern = "#"; pattern.length < 8; pattern+= "#") {
    console.log(pattern);
}
