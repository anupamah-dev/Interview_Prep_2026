-- PL/SQL package with a paging ref cursor and a stats procedure.
-- Run: @schema.sql then @interview_pkg.sql

CREATE OR REPLACE PACKAGE interview_pkg IS
  TYPE question_ref_cursor IS REF CURSOR;
  PROCEDURE get_questions(p_page_number IN NUMBER, p_page_size IN NUMBER, p_cursor OUT question_ref_cursor, p_total OUT NUMBER);
  PROCEDURE get_user_accuracy(p_user_id IN NUMBER, p_accuracy OUT NUMBER);
END interview_pkg;
/
CREATE OR REPLACE PACKAGE BODY interview_pkg IS
  PROCEDURE get_questions(p_page_number IN NUMBER, p_page_size IN NUMBER, p_cursor OUT question_ref_cursor, p_total OUT NUMBER) IS
    v_offset NUMBER := (p_page_number - 1) * p_page_size;
  BEGIN
    OPEN p_cursor FOR
      SELECT q.id, q.title, q.type, q.difficulty, q.created_at
      FROM questions q
      ORDER BY q.created_at DESC
      OFFSET v_offset ROWS FETCH NEXT p_page_size ROWS ONLY;
    SELECT COUNT(*) INTO p_total FROM questions;
  EXCEPTION WHEN OTHERS THEN
    p_total := 0;
    OPEN p_cursor FOR SELECT NULL id, NULL title, NULL type, NULL difficulty, NULL created_at FROM DUAL WHERE 1=0;
  END get_questions;

  PROCEDURE get_user_accuracy(p_user_id IN NUMBER, p_accuracy OUT NUMBER) IS
    v_total NUMBER := 0;
    v_correct NUMBER := 0;
  BEGIN
    SELECT COUNT(*), SUM(CASE WHEN a.correct = 1 THEN 1 ELSE 0 END) INTO v_total, v_correct
      FROM attempts a
      WHERE a.user_id = p_user_id;
    IF v_total = 0 THEN
      p_accuracy := NULL;
    ELSE
      p_accuracy := (v_correct / v_total) * 100;
    END IF;
  END get_user_accuracy;
END interview_pkg;
/
