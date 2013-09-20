

    This is a start on a horse racing game.  It uses javaScript with
HTML 5.  I used the Breakout game from Chapter 6 of "HTML 5 in Action,"
by Rob Crowther, Joe Lennon, Ash Blue, and Greg Wanish, as a starting
point for a new version of this game.

    Back on my first computer, I wrote a horse racing game that by
today's standards was very crude.  The old game's sequence of play
was:

1) auctioning horses to the players
2) Initial odds are set
3) Run eight races
   A) each player places bets
   B) The race is then run
   C) the owners of the top three horses get purses
   D) Bets are played off
   E) Odds are adjusted
4) The player with the most money wins
5) review the information about the horses,
   A) auction price paid vs. total purses won
   B) the finish in each race

  Out of all of the parts of listed above, I have only implemented
3B.  I figured it would be the toughest.  Also the horse's movement
scores are displayed in a table.  Each horse has eleven movement
scores.  Each score is between 8 and 15.  During each turn in the
race one of the eleven scores is added to the horses current position
to get their new position.  The finish line is at position 500, and
as the horses current position exceeds the finish line they are
awarded their finish.
   For instance ahorse with several high scores and a couple of low scores
might see all high scores in one race and finish either first or
close to first, but in the next race see more low values and place
towards the back.


   Some to-dos
    1) Allow players to meet up online, the old game supported
between two and four players.
    2) Implement the Auction, not sure what the controls should
look like or behave.  In the original game the horses where
auctioned off in order.  I was thinking of having multiple
auctions at the same time.
    3) Record and playoff the bets.
    4) Increase the number of horses to twelve.
    5) Find a new way to adjust the odds in the old system I
       shortened the odds on the first three finishers and
       lengthened the odds on the bottom three finishers.
       However, if a horse with odds of winning are 1:1
       (even money) and finished sixth or seventh the odds
       would not change.  the algorithm for changing odds
       has to take into account expectations.
    6) Slow the race down the animation speed by about a
       third it is too fast for my liking.
    7) Allow players to examine previous finishes, while
       placing bets.
