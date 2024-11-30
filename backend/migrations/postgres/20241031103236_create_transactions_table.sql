-- migrate:up
CREATE TABLE IF NOT EXISTS transactions (
    id uuid primary key default gen_random_uuid(),
    dateTime date not null,
		author varchar not null,
		sum numeric(19, 4) not null,
		category varchar not null CHECK (category IN ('internet', 'gas', 'electricity')),
		comment text
);

-- migrate:down
DROP TABLE IF EXISTS transactions
