-- Example usage (SQL*Plus / SQL Developer)
-- 1) Get page 1 with page size 10
VARIABLE rc REFCURSOR;
VARIABLE total NUMBER;
BEGIN
  interview_pkg.get_questions(1, 10, :rc, :total);
END;
/
PRINT rc
PRINT total

-- 2) Get user accuracy
VARIABLE acc NUMBER;
BEGIN
  interview_pkg.get_user_accuracy(1, :acc);
END;
/
PRINT acc
