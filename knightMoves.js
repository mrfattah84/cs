function knightMoves(start, stop) {
  const moves = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2],
  ];

  let queue = [[start]];

  while (
    queue[0][queue[0].length - 1][0] != stop[0] ||
    queue[0][queue[0].length - 1][1] != stop[1]
  ) {
    const lastMove = queue[0][queue[0].length - 1];
    moves.forEach((move) => {
      if (
        0 <= lastMove[0] + move[0] &&
        lastMove[0] + move[0] <= 7 &&
        0 <= lastMove[1] + move[1] &&
        lastMove[1] + move[1] <= 7
      ) {
        queue.push([
          ...queue[0],
          [lastMove[0] + move[0], lastMove[1] + move[1]],
        ]);
      }
    });
    queue.shift();
  }

  console.log(
    `You made it in ${queue[0].length - 1} moves!  Here's your path:`
  );
  queue[0].forEach((e) => {
    console.log(e);
  });
}

knightMoves([0, 0], [7, 7]);
