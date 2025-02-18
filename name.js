const starsContainer = document.getElementById('stars');
    for(let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.setProperty('--duration', (Math.random() * 3 + 1) + 's');
      starsContainer.appendChild(star);
    }

    function createSpan(char, index) {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'artistic';
      
      const fontStyle = document.getElementById('fontStyle').value;
      span.classList.add(fontStyle);
      
      const hue = (index * 20) % 360;
      span.style.background = `linear-gradient(45deg, hsl(${hue}, 80%, 60%), hsl(${hue + 30}, 80%, 60%))`;
      span.style.webkitBackgroundClip = 'text';
      span.style.webkitTextFillColor = 'transparent';
      
      return span;
    }

    function createSparkle(span) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      span.appendChild(sparkle);
    }

    function createMagicDust(x, y) {
      const dust = document.createElement('div');
      dust.className = 'magic-dust';
      dust.style.left = x + 'px';
      dust.style.top = y + 'px';
      dust.style.width = '2px';
      dust.style.height = '2px';
      dust.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`;
      dust.style.boxShadow = '0 0 10px 2px white';
      return dust;
    }
    function animateText(text) {
        output.innerHTML = '';
        const chars = text.split('');
        const fontStyle = document.getElementById('fontStyle').value;
        output.className = `output ${fontStyle}`;
        
        chars.forEach((char, index) => {
          const span = createSpan(char, index);
          output.appendChild(span);
          
          for(let i = 0; i < 3; i++) {
            setTimeout(() => createSparkle(span), index * 200 + i * 300);
          }
        });
  
        const spans = output.querySelectorAll('span');
        
        spans.forEach((span, index) => {
          setTimeout(() => {
            span.classList.add('char-appear');
            
            const rotation = Math.sin(index) * 8;
            const offsetY = Math.cos(index) * 8;
            const scale = 0.95 + Math.sin(index * 0.5) * 0.15;
            
            span.style.transform += ` rotate(${rotation}deg) translateY(${offsetY}px) scale(${scale})`;
            
            const rect = span.getBoundingClientRect();
            for(let i = 0; i < 5; i++) {
              const dust = createMagicDust(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
              );
              document.body.appendChild(dust);
              setTimeout(() => dust.remove(), 2000);
            }
          }, index * 150);
        });
      }
  
      // Event listeners remain the same
      const input = document.getElementById('nameInput');
      const typeBtn = document.getElementById('typeBtn');
      const output = document.getElementById('output');
  
      typeBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
          animateText(text);
          typeBtn.style.transform = 'scale(0.95)';
          setTimeout(() => typeBtn.style.transform = '', 150);
        }
      });
  
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const text = input.value.trim();
          if (text) {
            animateText(text);
          }
        }
      });