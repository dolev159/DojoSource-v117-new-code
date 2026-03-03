status = -1;
sel = -1;
act = -1;
cpost = -1;
selectedPost = -1;
stalkedName = "";
stalkMode = false;

function start() {
	if (cm.haveItem(4251202, 1)) {
	cm.gainItem(4251202, -1);
	cm.gainItem(1672003, 1);
	cm.warp(910000000, 0);
	cm.gainItem(4032329, 1);
		cm.sendOk("#bYou gave me the Secret Crystal, thank you #h !\r\n\r\nYou had successfulled with this mission.#k\r\n\r\nI gave you #i 1672003# which must be a part of you, save it and go the Android NPC which may be found in the Free Market.\r\nI gave you a #i 4032329# too, do not lose it.");
		cm.dispose();
	} else {
    cm.sendNext("So.... want get your Android? listen my words....");
}
}
function action(mode, type, selection) {
    status++;
    if (mode < 1) {
        cm.dispose();
        return;
    }
    switch (status) {
    case 0x00:
        stalkMode = false;
        cm.sendSimple("#bDarkness is here, I need my crystal for get my powers again.\r\nPlease go to Henesys and find#k #rChecky#k.#b\r\n\r\nYou must found him for get this - #i 4251202##k");
        cm.dispose();
	if (sel == 0) {
            status = -1;
            if (selection == 0) {
                action(1, -1, -1);
                return;
            } else if (selection < 0) {
                var number = Math.abs(selectedPost == -1 ? selection : selectedPost) + "";
                var postid = parseInt(number.substring(1));
                act = parseInt(number.substring(0, 1));
                switch (act) {
                case 0x01: //Remove
                    cm.disablePost(postid);
                    cm.sendNext("Comment removed succesfully.");
                    break;
                case 0x02: //Like
                    cm.likePost(postid);
                    cm.sendNext("You have liked the post.");
                    break;
                case 0x03: //Dislike
                    cm.dislikePost(postid);
                    cm.sendNext("You have dislike the post.");
                    break;
                case 0x04: //Comment
                    status = 2;
                    cpost = postid;
                    selectedPost = selection;
                    var comments = cm.loadCommentPost(postid);
                    comments += "#b#L0#Post a comment.#l\r\n#L1#Go back.#l";
                    cm.sendSimple(comments);
                    return;
                default:
                    cm.sendNext("Bacon.");
                    cm.dispose();
                    break;
                }
            } else {
                cm.sendNext("Bacon.");
                cm.dispose();
            }
        } else if (sel == 1) {
            cm.postWall(cm.getText());
            cm.sendNext("Your comment was submited succesfully!");
            status = -1;
        } else if (sel == 2) {
             stalkedName = cm.getText();
            if (cm.checkWall(stalkedName)) {
                cm.sendSimple(displayMessage(true));
            } else {
                status = -1;
                cm.sendNext("The username was not found... Told you, he lies.");
            }
        }
        selectedPost = -1;
        break;
    case 0x03:
        if (sel == 0) {
            if (act == 4) {
                if (selection == 0) {
                    cm.sendGetText("Post you comment below.");
                } else {
                    status = 0;
                    action(1, -1, 0);
                    return;
                }
            } else {
                cm.sendNext("Bacon.");
                cm.dispose();
            }
        } else if (sel == 2) {
            status = 1;
            sel = 0;
            stalkMode = true;
            action(1, -9, selection);
        } else {
            cm.sendNext("Bacon.");
            cm.dispose();
        }
        break;
    case 0x04:
        if (sel == 0) {
            if (act == 4) {
                status = 1;
                cm.commentPost(cpost, cm.getText());
                cm.sendNext("Your comment has been submited succesfully!");
            } else {
                cm.sendNext("Bacon.");
                cm.dispose();
            }
        } else {
            cm.sendNext("Bacon.");
            cm.dispose();
        }
        break;
    }
}

function displayMessage(stalk) {    
    var messages;
    var wall;
    if (stalk) {
        messages = cm.getPlayer().getFakebook().getStalk().getMessages();
        wall = stalkedName;
    } else {
        messages = cm.getPlayer().getFakebook().getMessages();
        wall = "#h #";
    }    
    wall += " wall!\r\n";
    for (var i = 0; i < messages.size(); i++) {
        var postid = messages.get(i).getPostId();
        wall += "\r\n----------------------------------------------\r\n";
        if (!stalk) {
            wall += "\t\t\t\t\t\t\t\t\t\t\t\t#L-1" + postid + "##i3991023##l\r\n\r\n"
        }
        wall += messages.get(i).getMessage();
        if (cm.getPlayer().getFakebook().getLikedPostId().contains(postid)) {
            wall += "\r\n\r\n#b#L-3" + postid + "#Dislike#l#k";
        } else {
            wall += "\r\n\r\n#b#L-2" + postid + "#Like#l#k";
        }
        wall += "\t\t\t\t\t\t\t#b#L-4" + postid + "#Comment#l#k";
        wall += "\r\n\r\n";
    }
    wall += "\r\n----------------------------------------------\r\n";
    wall += "#b#L0#I wanna go back to main menu!#l";
    return wall;
}  