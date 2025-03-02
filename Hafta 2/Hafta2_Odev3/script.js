let countdown;
        let timeLeft;

        function startCountdown() {
            clearInterval(countdown);
            timeLeft = parseInt(document.getElementById("timeInput").value);
            document.getElementById("countdown").textContent = `Süre: ${timeLeft}`;

            countdown = setInterval(() => {
                timeLeft--;
                document.getElementById("countdown").textContent = `Süre: ${timeLeft}`;
                
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    document.getElementById("countdown").textContent = "Süre doldu!";
                }
            }, 1000);
        }

        function resetCountdown() {
            clearInterval(countdown);
            document.getElementById("countdown").textContent = "Süre: -";
        }