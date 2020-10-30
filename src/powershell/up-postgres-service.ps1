$status = Get-Service postgresql-x64-11 | %{$_.Status}

Write-Output "Comecando a subir o Postgres..."

if ($status -eq "StartPending") {
	Write-Output "O servico esta subindo, aguardando atualizacao do status..."
	Start-Sleep -s 99
	$status = Get-Service postgresql-x64-11 | %{$_.Status}
}

while($status -eq "Stopped") {
	Start-Sleep -s 45
	Write-Output "Derrubando executaveis..."
	Stop-Process -Name "postgres" -Force
	Write-Output "Deletando arquivo de PID..."
	Remove-Item "C:\Program Files\PostgreSQL\11\data\postmaster.pid" -Force
	Write-Output "Subindo o servico..."
	Start-Service postgresql-x64-11
	Write-Output "Verificando o status do servico..."
	$status = Get-Service postgresql-x64-11 | %{$_.Status}
	Write-Output "Status do servico:" $status
}
