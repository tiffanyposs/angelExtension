var skills = {}
var tags = $('.tags').text();
var skillArray = tags.split("·");

//writes skills to the body
var writeBody = function() {
        $('body').empty();
        $('body').append($('<table></table>').addClass('table'))
        for (skill in skills) {
            var $row = $('<tr></tr>');
            var $key = $('<td></td>').text(skill);
            var $value = $('<td></td>').text(skills[skill]);
            $('body').append($row);
            $row.append($key, $value);
        }
    }

 //counts skills mentioned on the page
var calculateStuff = function(array) {
        array.forEach(function(skill) {
            var format = skill.trim().toLowerCase()
            if (skills[format]) {
                skills[format] += 1;
            } else {
                skills[format] = 1;
            }
        });
        writeBody()
    }

//splits up the text
var splitUp = function(array) {
    var splitArray = array;
    var i = 0;
    var splitters = ["\n", "↵", "/"];
    var combThrough = function() {
        var tempArray = [];
        splitArray.forEach(function(each) {
            var split = each.trim().split(splitters[i])
            split.forEach(function(word) {
                if (word !== "") tempArray.push(word)
            })
        })
        splitArray = tempArray;
        if (i < splitters.length - 1) {
            i++;
            combThrough()
        } else {
            calculateStuff(splitArray)
        }
    }
    combThrough()
}

//scrolls the page to reveil content
var scrollWholePg = function(times) {
    var x = 0;
    var scrollPage = setInterval(function() {
        if (x < times) {
            window.scrollTo(0, document.body.scrollHeight);
            x++;
        } else {
            splitUp(skillArray);
            clearInterval(scrollPage)
        }
    }, 1000)
}
scrollWholePg(20);