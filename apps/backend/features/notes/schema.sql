CREATE TABLE
    IF NOT EXISTS notes (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        user_id UUID DEFAULT,
        title TEXT,
        content TEXT,
        color VARCHAR(7) DEFAULT 'default',
        is_pinned BOOLEAN DEFAULT false,
        is_archived BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW (),
        updated_at TIMESTAMPTZ,
        deleted_at TIMESTAMPTZ
    );

CREATE TABLE
    IF NOT EXISTS tags (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        name TEXT UNIQUE NOT NULL,
    );

CREATE TABLE
    IF NOT EXISTS note_tags (
        note_id UUID REFERENCES notes (id) ON DELETE CASCADE NOT NULL,
        tag_id UUID REFERENCES tags (id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW (),
        PRIMARY KEY (note_id, tag_id)
    );