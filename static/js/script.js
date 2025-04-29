document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const autoModeBtn = document.getElementById('auto-mode');
    const manualModeBtn = document.getElementById('manual-mode');
    const activitySelector = document.querySelector('.activity-selector');
    const activityOptions = document.querySelectorAll('.activity-option');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultSection = document.querySelector('.result-section');
    const resetBtn = document.getElementById('reset-btn');
    const activityName = document.getElementById('activity-name');
    const activityConfidence = document.getElementById('activity-confidence');
    const activityDescription = document.getElementById('activity-description');
    const resultIcon = document.getElementById('result-icon');
    const suggestionsList = document.getElementById('suggestions-list');

    // Activity data
    const activities = {
        walking: {
            icon: 'fa-walking',
            description: 'Walking is a low-impact physical activity that improves cardiovascular health.',
            confidence: 92,
            suggestions: [
                'Maintain a steady pace for better health benefits',
                'Try to walk at least 30 minutes daily',
                'Use proper footwear to prevent injuries'
            ]
        },
        running: {
            icon: 'fa-running',
            description: 'Running is a high-intensity exercise that boosts endurance and burns calories.',
            confidence: 88,
            suggestions: [
                'Warm up properly before running',
                'Maintain good posture while running',
                'Stay hydrated during your run'
            ]
        },
        jumping: {
            icon: 'fa-frog',
            description: 'Jumping exercises improve explosive power and coordination.',
            confidence: 85,
            suggestions: [
                'Land softly to reduce impact on joints',
                'Start with small jumps and increase intensity gradually',
                'Combine with other exercises for a full workout'
            ]
        },
        sitting: {
            icon: 'fa-chair',
            description: 'Sitting for prolonged periods can negatively impact your health.',
            confidence: 95,
            suggestions: [
                'Take breaks every 30 minutes to stand and stretch',
                'Maintain good posture while sitting',
                'Consider using a standing desk'
            ]
        },
        standing: {
            icon: 'fa-user',
            description: 'Standing is better than sitting but movement is still important.',
            confidence: 90,
            suggestions: [
                'Shift your weight occasionally',
                'Consider gentle movements like calf raises',
                'Don\'t stand completely still for too long'
            ]
        },
        cycling: {
            icon: 'fa-bicycle',
            description: 'Cycling is an excellent low-impact cardiovascular exercise.',
            confidence: 87,
            suggestions: [
                'Adjust your seat height for proper leg extension',
                'Wear a helmet for safety',
                'Maintain a consistent pedaling rhythm'
            ]
        }
    };

    // Mode selection
    autoModeBtn.addEventListener('click', function() {
        this.classList.add('active');
        manualModeBtn.classList.remove('active');
        activitySelector.classList.add('hidden');
    });

    manualModeBtn.addEventListener('click', function() {
        this.classList.add('active');
        autoModeBtn.classList.remove('active');
        activitySelector.classList.remove('hidden');
    });

    // Activity selection
    activityOptions.forEach(option => {
        option.addEventListener('click', function() {
            activityOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Analyze button
    analyzeBtn.addEventListener('click', function() {
        if (autoModeBtn.classList.contains('active')) {
            // Auto detection mode - pick a random activity
            const activityKeys = Object.keys(activities);
            const randomActivity = activityKeys[Math.floor(Math.random() * activityKeys.length)];
            displayResults(randomActivity);
        } else {
            // Manual selection mode
            const selectedOption = document.querySelector('.activity-option.selected');
            if (selectedOption) {
                const activity = selectedOption.dataset.activity;
                displayResults(activity);
            } else {
                alert('Please select an activity first!');
            }
        }
    });

    // Reset button
    resetBtn.addEventListener('click', function() {
        resultSection.classList.add('hidden');
        activityOptions.forEach(opt => opt.classList.remove('selected'));
        autoModeBtn.click(); // Reset to auto mode
    });

    // Display results
    function displayResults(activity) {
        const activityData = activities[activity];
        
        // Update UI
        activityName.textContent = activity.charAt(0).toUpperCase() + activity.slice(1);
        activityConfidence.textContent = `Confidence: ${activityData.confidence}%`;
        activityDescription.textContent = activityData.description;
        resultIcon.className = `fas ${activityData.icon}`;
        
        // Update suggestions
        suggestionsList.innerHTML = '';
        activityData.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
        
        // Show results section
        resultSection.classList.remove('hidden');
        
        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
});