import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export const actual = `
/* test table_1 */
CREATE TABLE test.table_1 (
  text_column TEXT NOT NULL PRIMARY KEY, -- text affinity
  num_column NUMERIC, -- numeric affinity
  int_column INTEGER, -- integer affinity
  real_column INTEGER, -- real affinity
  blob_column BLOB,   -- no affinity
  no_affinity_column  -- no affinity
);
/* test table_2 */
CREATE temp TABLE table_2 (
  "text_column" TEXT NOT NULL, /*text affinity*/
  [num_column] NUMERIC NOT NULL, /*numeric affinity*/
  \`int_column\` INTEGER, /*integer affinity*/
  "real_column" INTEGER, /*real affinity*/
  [blob_column] BLOB,   /*no affinity*/
  \`no_affinity_column\`,  /*no affinity*/
  PRIMARY KEY (text_column, num_column)
);
/* test table_3 */
CREATE temporary TABLE table_3 (
  col_1 TEXT,
  col_2 NUMERIC,
  CONSTRAINT c_001 UNIQUE ( col_1, col_2 ) ON CONFLICT ROLLBACK,
  CONSTRAINT c_002 CHECK ( col_1 + col_2 > 0 ),
  CONSTRAINT c_003 FOREIGN KEY ( col_1, col_2 )
    REFERENCES table_1 (text_column, num_column)
    ON DELETE SET NULL
    MATCH table_1
    ON UPDATE CASCADE
    NOT DEFERRABLE INITIALLY DEFERRED,
)
`.trim()
export const expected = [
  new Token(Keyword.CREATE, "CREATE", { keyword: Keyword.CREATE, preskips: [new Token(TokenType.BlockComment, "/* test table_1 */", { location: new SourceLocation(0, 1, 0)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(18, 1, 18)})], location: new SourceLocation(19, 2, 1)}),
  new Token(Keyword.TABLE, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(25, 2, 7)})], location: new SourceLocation(26, 2, 8)}),
  new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(31, 2, 13)})], location: new SourceLocation(32, 2, 14)}),
  new Token(TokenType.Dot, ".", { location: new SourceLocation(36, 2, 18)}),
  new Token(TokenType.Identifier, "table_1", { location: new SourceLocation(37, 2, 19)}),
  new Token(TokenType.LeftParen, "(", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(44, 2, 26)})], location: new SourceLocation(45, 2, 27)}),
  new Token(TokenType.Identifier, "text_column", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(46, 2, 28)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(47, 3, 1)})], location: new SourceLocation(49, 3, 3)}),
  new Token(TokenType.Identifier, "TEXT", { keyword: Keyword.TEXT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(60, 3, 14)})], location: new SourceLocation(61, 3, 15)}),
  new Token(Keyword.NOT, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(65, 3, 19)})], location: new SourceLocation(66, 3, 20)}),
  new Token(Keyword.NULL, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(69, 3, 23)})], location: new SourceLocation(70, 3, 24)}),
  new Token(Keyword.PRIMARY, "PRIMARY", { keyword: Keyword.PRIMARY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(74, 3, 28)})], location: new SourceLocation(75, 3, 29)}),
  new Token(TokenType.Identifier, "KEY", { keyword: Keyword.KEY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(82, 3, 36)})], location: new SourceLocation(83, 3, 37)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(87, 3, 41)}), new Token(TokenType.LineComment, "-- text affinity", { location: new SourceLocation(88, 3, 42)})], location: new SourceLocation(86, 3, 40)}),
  new Token(TokenType.Identifier, "num_column", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(104, 3, 58)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(105, 4, 1)})], location: new SourceLocation(107, 4, 3)}),
  new Token(TokenType.Identifier, "NUMERIC", { keyword: Keyword.NUMERIC, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(117, 4, 13)})], location: new SourceLocation(118, 4, 14)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(126, 4, 22)}), new Token(TokenType.LineComment, "-- numeric affinity", { location: new SourceLocation(127, 4, 23)})], location: new SourceLocation(125, 4, 21)}),
  new Token(TokenType.Identifier, "int_column", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(146, 4, 42)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(147, 5, 1)})], location: new SourceLocation(149, 5, 3)}),
  new Token(TokenType.Identifier, "INTEGER", { keyword: Keyword.INTEGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(159, 5, 13)})], location: new SourceLocation(160, 5, 14)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(168, 5, 22)}), new Token(TokenType.LineComment, "-- integer affinity", { location: new SourceLocation(169, 5, 23)})], location: new SourceLocation(167, 5, 21)}),
  new Token(TokenType.Identifier, "real_column", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(188, 5, 42)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(189, 6, 1)})], location: new SourceLocation(191, 6, 3)}),
  new Token(TokenType.Identifier, "INTEGER", { keyword: Keyword.INTEGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(202, 6, 14)})], location: new SourceLocation(203, 6, 15)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(211, 6, 23)}), new Token(TokenType.LineComment, "-- real affinity", { location: new SourceLocation(212, 6, 24)})], location: new SourceLocation(210, 6, 22)}),
  new Token(TokenType.Identifier, "blob_column", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(228, 6, 40)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(229, 7, 1)})], location: new SourceLocation(231, 7, 3)}),
  new Token(TokenType.Identifier, "BLOB", { keyword: Keyword.BLOB, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(242, 7, 14)})], location: new SourceLocation(243, 7, 15)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, "   ", { location: new SourceLocation(248, 7, 20)}), new Token(TokenType.LineComment, "-- no affinity", { location: new SourceLocation(251, 7, 23)})], location: new SourceLocation(247, 7, 19)}),
  new Token(TokenType.Identifier, "no_affinity_column", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(265, 7, 37)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(266, 8, 1)})], postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(286, 8, 21)}), new Token(TokenType.LineComment, "-- no affinity", { location: new SourceLocation(288, 8, 23)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(302, 8, 37)})], location: new SourceLocation(268, 8, 3)}),
  new Token(TokenType.RightParen, ")", { location: new SourceLocation(303, 9, 1)}),
  new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(304, 9, 2)}),
  new Token(Keyword.CREATE, "CREATE", { keyword: Keyword.CREATE, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(305, 9, 3)}), new Token(TokenType.BlockComment, "/* test table_2 */", { location: new SourceLocation(306, 10, 1)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(324, 10, 19)})], location: new SourceLocation(325, 11, 1)}),
  new Token(TokenType.Identifier, "temp", { keyword: Keyword.TEMP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(331, 11, 7)})], location: new SourceLocation(332, 11, 8)}),
  new Token(Keyword.TABLE, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(336, 11, 12)})], location: new SourceLocation(337, 11, 13)}),
  new Token(TokenType.Identifier, "table_2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(342, 11, 18)})], location: new SourceLocation(343, 11, 19)}),
  new Token(TokenType.LeftParen, "(", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(350, 11, 26)})], location: new SourceLocation(351, 11, 27)}),
  new Token(TokenType.QuotedValue, "\"text_column\"", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(352, 11, 28)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(353, 12, 1)})], location: new SourceLocation(355, 12, 3)}),
  new Token(TokenType.Identifier, "TEXT", { keyword: Keyword.TEXT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(368, 12, 16)})], location: new SourceLocation(369, 12, 17)}),
  new Token(Keyword.NOT, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(373, 12, 21)})], location: new SourceLocation(374, 12, 22)}),
  new Token(Keyword.NULL, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(377, 12, 25)})], location: new SourceLocation(378, 12, 26)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(383, 12, 31)}), new Token(TokenType.BlockComment, "/*text affinity*/", { location: new SourceLocation(384, 12, 32)})], location: new SourceLocation(382, 12, 30)}),
  new Token(TokenType.QuotedIdentifier, "[num_column]", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(401, 12, 49)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(402, 13, 1)})], location: new SourceLocation(404, 13, 3)}),
  new Token(TokenType.Identifier, "NUMERIC", { keyword: Keyword.NUMERIC, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(416, 13, 15)})], location: new SourceLocation(417, 13, 16)}),
  new Token(Keyword.NOT, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(424, 13, 23)})], location: new SourceLocation(425, 13, 24)}),
  new Token(Keyword.NULL, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(428, 13, 27)})], location: new SourceLocation(429, 13, 28)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(434, 13, 33)}), new Token(TokenType.BlockComment, "/*numeric affinity*/", { location: new SourceLocation(435, 13, 34)})], location: new SourceLocation(433, 13, 32)}),
  new Token(TokenType.QuotedIdentifier, "`int_column`", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(455, 13, 54)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(456, 14, 1)})], location: new SourceLocation(458, 14, 3)}),
  new Token(TokenType.Identifier, "INTEGER", { keyword: Keyword.INTEGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(470, 14, 15)})], location: new SourceLocation(471, 14, 16)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(479, 14, 24)}), new Token(TokenType.BlockComment, "/*integer affinity*/", { location: new SourceLocation(480, 14, 25)})], location: new SourceLocation(478, 14, 23)}),
  new Token(TokenType.QuotedValue, "\"real_column\"", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(500, 14, 45)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(501, 15, 1)})], location: new SourceLocation(503, 15, 3)}),
  new Token(TokenType.Identifier, "INTEGER", { keyword: Keyword.INTEGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(516, 15, 16)})], location: new SourceLocation(517, 15, 17)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(525, 15, 25)}), new Token(TokenType.BlockComment, "/*real affinity*/", { location: new SourceLocation(526, 15, 26)})], location: new SourceLocation(524, 15, 24)}),
  new Token(TokenType.QuotedIdentifier, "[blob_column]", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(543, 15, 43)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(544, 16, 1)})], location: new SourceLocation(546, 16, 3)}),
  new Token(TokenType.Identifier, "BLOB", { keyword: Keyword.BLOB, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(559, 16, 16)})], location: new SourceLocation(560, 16, 17)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, "   ", { location: new SourceLocation(565, 16, 22)}), new Token(TokenType.BlockComment, "/*no affinity*/", { location: new SourceLocation(568, 16, 25)})], location: new SourceLocation(564, 16, 21)}),
  new Token(TokenType.QuotedIdentifier, "`no_affinity_column`", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(583, 16, 40)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(584, 17, 1)})], location: new SourceLocation(586, 17, 3)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(607, 17, 24)}), new Token(TokenType.BlockComment, "/*no affinity*/", { location: new SourceLocation(609, 17, 26)})], location: new SourceLocation(606, 17, 23)}),
  new Token(Keyword.PRIMARY, "PRIMARY", { keyword: Keyword.PRIMARY, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(624, 17, 41)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(625, 18, 1)})], location: new SourceLocation(627, 18, 3)}),
  new Token(TokenType.Identifier, "KEY", { keyword: Keyword.KEY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(634, 18, 10)})], location: new SourceLocation(635, 18, 11)}),
  new Token(TokenType.LeftParen, "(", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(638, 18, 14)})], location: new SourceLocation(639, 18, 15)}),
  new Token(TokenType.Identifier, "text_column", { location: new SourceLocation(640, 18, 16)}),
  new Token(TokenType.Comma, ",", { location: new SourceLocation(651, 18, 27)}),
  new Token(TokenType.Identifier, "num_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(652, 18, 28)})], location: new SourceLocation(653, 18, 29)}),
  new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(664, 18, 40)})], location: new SourceLocation(663, 18, 39)}),
  new Token(TokenType.RightParen, ")", { location: new SourceLocation(665, 19, 1)}),
  new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(666, 19, 2)}),
  new Token(Keyword.CREATE, "CREATE", { keyword: Keyword.CREATE, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(667, 19, 3)}), new Token(TokenType.BlockComment, "/* test table_3 */", { location: new SourceLocation(668, 20, 1)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(686, 20, 19)})], location: new SourceLocation(687, 21, 1)}),
  new Token(Keyword.TEMPORARY, "temporary", { keyword: Keyword.TEMPORARY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(693, 21, 7)})], location: new SourceLocation(694, 21, 8)}),
  new Token(Keyword.TABLE, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(703, 21, 17)})], location: new SourceLocation(704, 21, 18)}),
  new Token(TokenType.Identifier, "table_3", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(709, 21, 23)})], location: new SourceLocation(710, 21, 24)}),
  new Token(TokenType.LeftParen, "(", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(717, 21, 31)})], location: new SourceLocation(718, 21, 32)}),
  new Token(TokenType.Identifier, "col_1", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(719, 21, 33)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(720, 22, 1)})], location: new SourceLocation(722, 22, 3)}),
  new Token(TokenType.Identifier, "TEXT", { keyword: Keyword.TEXT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(727, 22, 8)})], location: new SourceLocation(728, 22, 9)}),
  new Token(TokenType.Comma, ",", { location: new SourceLocation(732, 22, 13)}),
  new Token(TokenType.Identifier, "col_2", { preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(733, 22, 14)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(734, 23, 1)})], location: new SourceLocation(736, 23, 3)}),
  new Token(TokenType.Identifier, "NUMERIC", { keyword: Keyword.NUMERIC, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(741, 23, 8)})], location: new SourceLocation(742, 23, 9)}),
  new Token(TokenType.Comma, ",", { location: new SourceLocation(749, 23, 16)}),
  new Token(Keyword.CONSTRAINT, "CONSTRAINT", { keyword: Keyword.CONSTRAINT, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(750, 23, 17)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(751, 24, 1)})], location: new SourceLocation(753, 24, 3)}),
  new Token(TokenType.Identifier, "c_001", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(763, 24, 13)})], location: new SourceLocation(764, 24, 14)}),
  new Token(Keyword.UNIQUE, "UNIQUE", { keyword: Keyword.UNIQUE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(769, 24, 19)})], location: new SourceLocation(770, 24, 20)}),
  new Token(TokenType.LeftParen, "(", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(776, 24, 26)})], location: new SourceLocation(777, 24, 27)}),
  new Token(TokenType.Identifier, "col_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(778, 24, 28)})], location: new SourceLocation(779, 24, 29)}),
  new Token(TokenType.Comma, ",", { location: new SourceLocation(784, 24, 34)}),
  new Token(TokenType.Identifier, "col_2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(785, 24, 35)})], location: new SourceLocation(786, 24, 36)}),
  new Token(TokenType.RightParen, ")", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(791, 24, 41)})], location: new SourceLocation(792, 24, 42)}),
  new Token(Keyword.ON, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(793, 24, 43)})], location: new SourceLocation(794, 24, 44)}),
  new Token(TokenType.Identifier, "CONFLICT", { keyword: Keyword.CONFLICT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(796, 24, 46)})], location: new SourceLocation(797, 24, 47)}),
  new Token(TokenType.Identifier, "ROLLBACK", { keyword: Keyword.ROLLBACK, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(805, 24, 55)})], location: new SourceLocation(806, 24, 56)}),
  new Token(TokenType.Comma, ",", { location: new SourceLocation(814, 24, 64)}),
  new Token(Keyword.CONSTRAINT, "CONSTRAINT", { keyword: Keyword.CONSTRAINT, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(815, 24, 65)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(816, 25, 1)})], location: new SourceLocation(818, 25, 3)}),
  new Token(TokenType.Identifier, "c_002", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(828, 25, 13)})], location: new SourceLocation(829, 25, 14)}),
  new Token(Keyword.CHECK, "CHECK", { keyword: Keyword.CHECK, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(834, 25, 19)})], location: new SourceLocation(835, 25, 20)}),
  new Token(TokenType.LeftParen, "(", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(840, 25, 25)})], location: new SourceLocation(841, 25, 26)}),
  new Token(TokenType.Identifier, "col_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(842, 25, 27)})], location: new SourceLocation(843, 25, 28)}),
  new Token(TokenType.Operator, "+", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(848, 25, 33)})], location: new SourceLocation(849, 25, 34)}),
  new Token(TokenType.Identifier, "col_2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(850, 25, 35)})], location: new SourceLocation(851, 25, 36)}),
  new Token(TokenType.Operator, ">", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(856, 25, 41)})], location: new SourceLocation(857, 25, 42)}),
  new Token(TokenType.Numeric, "0", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(858, 25, 43)})], location: new SourceLocation(859, 25, 44)}),
  new Token(TokenType.RightParen, ")", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(860, 25, 45)})], location: new SourceLocation(861, 25, 46)}),
  new Token(TokenType.Comma, ",", { location: new SourceLocation(862, 25, 47)}),
  new Token(Keyword.CONSTRAINT, "CONSTRAINT", { keyword: Keyword.CONSTRAINT, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(863, 25, 48)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(864, 26, 1)})], location: new SourceLocation(866, 26, 3)}),
  new Token(TokenType.Identifier, "c_003", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(876, 26, 13)})], location: new SourceLocation(877, 26, 14)}),
  new Token(Keyword.FOREIGN, "FOREIGN", { keyword: Keyword.FOREIGN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(882, 26, 19)})], location: new SourceLocation(883, 26, 20)}),
  new Token(TokenType.Identifier, "KEY", { keyword: Keyword.KEY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(890, 26, 27)})], location: new SourceLocation(891, 26, 28)}),
  new Token(TokenType.LeftParen, "(", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(894, 26, 31)})], location: new SourceLocation(895, 26, 32)}),
  new Token(TokenType.Identifier, "col_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(896, 26, 33)})], location: new SourceLocation(897, 26, 34)}),
  new Token(TokenType.Comma, ",", { location: new SourceLocation(902, 26, 39)}),
  new Token(TokenType.Identifier, "col_2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(903, 26, 40)})], location: new SourceLocation(904, 26, 41)}),
  new Token(TokenType.RightParen, ")", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(909, 26, 46)})], location: new SourceLocation(910, 26, 47)}),
  new Token(Keyword.REFERENCES, "REFERENCES", { keyword: Keyword.REFERENCES, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(911, 26, 48)}), new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(912, 27, 1)})], location: new SourceLocation(916, 27, 5)}),
  new Token(TokenType.Identifier, "table_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(926, 27, 15)})], location: new SourceLocation(927, 27, 16)}),
  new Token(TokenType.LeftParen, "(", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(934, 27, 23)})], location: new SourceLocation(935, 27, 24)}),
  new Token(TokenType.Identifier, "text_column", { location: new SourceLocation(936, 27, 25)}),
  new Token(TokenType.Comma, ",", { location: new SourceLocation(947, 27, 36)}),
  new Token(TokenType.Identifier, "num_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(948, 27, 37)})], location: new SourceLocation(949, 27, 38)}),
  new Token(TokenType.RightParen, ")", { location: new SourceLocation(959, 27, 48)}),
  new Token(Keyword.ON, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(960, 27, 49)}), new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(961, 28, 1)})], location: new SourceLocation(965, 28, 5)}),
  new Token(Keyword.DELETE, "DELETE", { keyword: Keyword.DELETE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(967, 28, 7)})], location: new SourceLocation(968, 28, 8)}),
  new Token(Keyword.SET, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(974, 28, 14)})], location: new SourceLocation(975, 28, 15)}),
  new Token(Keyword.NULL, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(978, 28, 18)})], location: new SourceLocation(979, 28, 19)}),
  new Token(TokenType.Identifier, "MATCH", { keyword: Keyword.MATCH, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(983, 28, 23)}), new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(984, 29, 1)})], location: new SourceLocation(988, 29, 5)}),
  new Token(TokenType.Identifier, "table_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(993, 29, 10)})], location: new SourceLocation(994, 29, 11)}),
  new Token(Keyword.ON, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(1001, 29, 18)}), new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(1002, 30, 1)})], location: new SourceLocation(1006, 30, 5)}),
  new Token(Keyword.UPDATE, "UPDATE", { keyword: Keyword.UPDATE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1008, 30, 7)})], location: new SourceLocation(1009, 30, 8)}),
  new Token(TokenType.Identifier, "CASCADE", { keyword: Keyword.CASCADE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1015, 30, 14)})], location: new SourceLocation(1016, 30, 15)}),
  new Token(Keyword.NOT, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(1023, 30, 22)}), new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(1024, 31, 1)})], location: new SourceLocation(1028, 31, 5)}),
  new Token(Keyword.DEFERRABLE, "DEFERRABLE", { keyword: Keyword.DEFERRABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1031, 31, 8)})], location: new SourceLocation(1032, 31, 9)}),
  new Token(TokenType.Identifier, "INITIALLY", { keyword: Keyword.INITIALLY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1042, 31, 19)})], location: new SourceLocation(1043, 31, 20)}),
  new Token(TokenType.Identifier, "DEFERRED", { keyword: Keyword.DEFERRED, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1052, 31, 29)})], location: new SourceLocation(1053, 31, 30)}),
  new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(1062, 31, 39)})], location: new SourceLocation(1061, 31, 38)}),
  new Token(TokenType.RightParen, ")", { location: new SourceLocation(1063, 32, 1)}),
  new Token(TokenType.Eof, "", { eos: true, location: new SourceLocation(1064, 32, 2)})
]