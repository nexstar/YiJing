-- 依據月份,日期,掛象 排序 日期,月份 asc
SELECT Tmonth.month,TDay.day,TDay.hangcontant FROM `TDay` TDay JOIN Tmonth Tmonth ON 
	   TDay.hangcontant=Tmonth.hangcontant ORDER by TDay.day,Tmonth.month asc

-- 只需輸入月份與日期就可搜尋出掛名 (農曆與國立)
SELECT TDay.hangcontant as '掛名',hang.number as '第幾掛',
	   Tmonth.month as '月份',TDay.day as '日期',hang.hang_lat as '上掛',hang.hang_long as '下掛',
	   hang.depiction,hang.situation,hang.countermeasure FROM `TDay` TDay JOIN Tmonth Tmonth ON 
	   TDay.hangcontant=Tmonth.hangcontant JOIN hang hang on hang.name=TDay.hangcontant WHERE 
	   Tmonth.month='3' and TDay.day='4'