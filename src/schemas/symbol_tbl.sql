CREATE TABLE IF NOT EXISTS ${table_name<<GLD>>}_tbl --table_name is equeal with symbol
(
	`{table_name}_id` int NOT NULL AUTO_INCREMENT,
	`symbol` varchar(20) NOT NULL,
    `symbol_called_date` varchar(20) NOT NULL UNIQUE,
    `opening`  varchar(20) NOT NULL,
    `high` varchar(20) NOT NULL,
    `low`  varchar(20) NOT NULL ,
    `closing`   varchar(20) NOT NULL,
                                        
	PRIMARY KEY (`{table_name}_id`)
);




CREATE TABLE IF NOT EXISTS SPY
(
	SPY_id int NOT NULL AUTO_INCREMENT,
	symbol varchar(20) NOT NULL,
    symbol_called_date varchar(20) NOT NULL UNIQUE,
    opening  varchar(20) NOT NULL,
    high varchar(20) NOT NULL,
    low  varchar(20) NOT NULL ,
    closing   varchar(20) NOT NULL,
                                        
	PRIMARY KEY (SPY_id)
);