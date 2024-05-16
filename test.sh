#!/bin/bash

# 執行測試並將覆蓋率報告保存到新的文件中
cd backend
npm run test > coverage_report_new.txt

# 檢查舊的覆蓋率報告是否存在
if [ ! -f coverage_report_old.txt ]; then
    mv coverage_report_new.txt coverage_report_old.txt
    exit 0
fi

# 從報告中提取覆蓋率
old_coverage=$(grep 'All files' coverage_report_old.txt | awk '{print $4}' )
new_coverage=$(grep 'All files' coverage_report_new.txt | awk '{print $4}' )

# 比較覆蓋率
if (( $(echo "$new_coverage < $old_coverage" | bc -l) )); then
    echo "失敗：當前的覆蓋率（$new_coverage%）比先前的覆蓋率（$old_coverage%）低。"
    exit 1
else
    echo "正確：當前的覆蓋率（$new_coverage%）比先前的覆蓋率（$old_coverage%）高或相等。"
    mv coverage_report_new.txt coverage_report_old.txt
    exit 0
fi
