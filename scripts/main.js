document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '2951999272666817f2ff6c05c4f0d6db'; // Tu API key de TMDb
  const videoContainer = document.getElementById('video-container');
  
  const kdramas = [
    {
      title: 'Propuesta laboral',
      url: 'https://ok.ru/videoembed/3570223155785'
    },
    {
      title: 'Aterrizaje de emergencia en tu corazón',
      url: 'https://ok.ru/videoembed/2455534504618'
    },
    {
      title: 'Parasyte',
      url: 'https://ok.ru/videoembed/8066856454805'
    },
    {
      title: "Esta bien no estar bien",
      url: 'https://ok.ru/videoembed/2425472289450'
    },
    {
      title: 'Mi adorable demonio',
      url: 'https://ok.ru/videoembed/7631668185749'
    }
  ];

  kdramas.forEach(kdrama => {
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(kdrama.title)}&language=es-ES`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        const result = data.results[0]; // Tomar el primer resultado de la búsqueda
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        
        const thumbnail = document.createElement('img');
        thumbnail.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
        thumbnail.alt = result.name;
        videoItem.appendChild(thumbnail);
        
        const title = document.createElement('p');
        title.textContent = result.name;
        videoItem.appendChild(title);
        
        videoItem.addEventListener('click', () => {
          window.location.href = `video.html?url=${encodeURIComponent(kdrama.url)}`;
        });

        videoContainer.appendChild(videoItem);
      })
      .catch(error => {
        console.error('Error fetching data from TMDb:', error);
      });
  });
});
