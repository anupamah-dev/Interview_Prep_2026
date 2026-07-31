package com.example.demo.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Map;

/**
 * Simple example showing how to call an OUT-number stored proc named GET_QUESTION_COUNT.
 * For Oracle ref-cursor usage, you need the Oracle JDBC types and declare SqlOutParameter with OracleTypes.CURSOR.
 */
@Repository
public class JdbcStoredProcRepository {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcCall simpleJdbcCall;

    public JdbcStoredProcRepository(JdbcTemplate jdbcTemplate, DataSource ds) {
        this.jdbcTemplate = jdbcTemplate;
        this.simpleJdbcCall = new SimpleJdbcCall(ds)
            .withProcedureName("GET_QUESTION_COUNT");
            // .withoutProcedureColumnMetaDataAccess()
            // .declareParameters(new SqlOutParameter("P_COUNT", Types.NUMERIC));
            // adjust depending on DB and metadata availability
    }

    public Map<String, Object> callGetQuestionCount() {
        // If procedure has no inputs and one OUT param named P_COUNT, call like:
        return simpleJdbcCall.execute();
    }
}
