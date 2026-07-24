CREATE TABLE
    IF NOT EXISTS notes (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        user_id UUID DEFAULT uuidv7 (),
        title TEXT DEFAULT '',
        content TEXT DEFAULT '',
    );