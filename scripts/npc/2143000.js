/*
	名字:	情報員
	地圖:	騎士團第2區域
	描述:	271030200
*/

function start() {
	var chat = "You're planning to go to the Hallowed Ground? Good idea. You'll be able to weaken them by defeating the spirits there. #b";
	chat += "\r\n#L0##m271030201# of Dawn";
	chat += "\r\n#L1##m271030202# of Blaze";
	chat += "\r\n#L2##m271030203# of Wind";
	chat += "\r\n#L3##m271030204# of Night";
	chat += "\r\n#L4##m271030205# of Thunder";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(271030201 + selection), cm.getMap(271030201 + selection).getPortal(1));
		cm.dispose();
}