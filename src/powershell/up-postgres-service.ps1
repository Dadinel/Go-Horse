$status = Get-Service postgresql-x64-11 | %{$_.Status}

while($status -eq "Stopped") {
	Stop-Process -Name "postgres" -Force
	Start-Service postgresql-x64-11
	$status = Get-Service postgresql-x64-11 | %{$_.Status}
}
