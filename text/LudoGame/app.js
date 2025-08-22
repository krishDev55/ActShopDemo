let stompClient;
let roomId;
let playerName;

function joinRoom() {
  roomId = document.getElementById("roomId").value.trim();
  playerName = document.getElementById("playerName").value.trim();
  if (!roomId || !playerName) {
    alert("Enter Room ID and Name");
    return;
  }

  document.getElementById("room-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  document.getElementById("displayRoomId").textContent = roomId;
  document.getElementById("displayPlayer").textContent = playerName;

  const socket = new SockJS('/ludo');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);

    stompClient.subscribe(`/topic/room/${roomId}`, function (message) {
      const gameState = JSON.parse(message.body);
      updateGameBoard(gameState);
    });

    // Notify server that player has joined
    stompClient.send(`/app/room/${roomId}/join`, {}, JSON.stringify({
      playerName: playerName,
      roomId: roomId
    }));
  });
}

function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceValue").textContent = diceValue;

  const move = {
    playerId: playerName, // using name as ID for now
    roomId: roomId,
    diceValue: diceValue,
    tokenId: "T1" // Example token ID
  };

  stompClient.send(`/app/room/${roomId}/move`, {}, JSON.stringify(move));
}

function updateGameBoard(gameState) {
  // Placeholder logic
  console.log("Updated Game State", gameState);
  // TODO: Render tokens, update board UI
}


const board = document.getElementById("board");
for (let i = 0; i < 64; i++) {
  const cell = document.createElement("div");
  cell.id = "cell-" + i;
  cell.textContent = i;
  board.appendChild(cell);
}