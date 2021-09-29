CREATE TABLE  ${table_name} --symbol_timeframe
(
	`{table_name}_id` int NOT NULL AUTO_INCREMENT,
	`{symbol}` varchar(20) NOT NULL,
    `symbol_date` varchar(20) NOT NULL UNIQUE,
    `opening`  varchar(20) NOT NULL,
    `high` varchar(20) NOT NULL,
    `low`  varchar(20) NOT NULL ,
    `closing`   varchar(20) NOT NULL,
                                        
	PRIMARY KEY (`{table_name}_id`)
);