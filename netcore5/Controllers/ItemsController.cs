using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SmokeDetection.Repositories;
using SmokeDetection.Entities;
using System;
using System.Linq;
using SmokeDetection.Dtos;

namespace SmokeDetection.Controllers
{
    [ApiController]
    [Route("gas-emissions")]
    public class GasConcentrationController : ControllerBase
    {
        private readonly IGasConcentrationRepository repository;

        public GasConcentrationController(IGasConcentrationRepository repository)
        {
            this.repository = repository;
        }

        // GET /gas-concentration
        [HttpGet]
        public IEnumerable<GasConcentrationDto> GetItems()
        {
            var items = repository.GetAllGasConcentrations().Select(item => item.AsDto());
            return items;
        }

        // GET /gas-concentration/{id}
        [HttpGet("{id}")]
        public ActionResult<GasConcentrationDto> GetItem(Guid id)
        {
            var item = repository.GetGasConcentration(id).AsDto();

            if (item is null)
            {
                return NotFound();
            }

            return item;
        }

        // GET /gas-concentration/city/{city}
        [HttpGet("city/{city}")]
        public GasConcentrationDto GetConcentrationByCity(string city)
        {
            var items = repository.GetConcentrationByCity(city).Select(item => item.AsDto()).FirstOrDefault();
            return items;
        }

        // GET /gas-concentration/cities
        [HttpGet("cities")]
        public List<string> GetCities()
        {
            return repository.GetCities();
        }

        // POST //gas-concentration
        [HttpPost]
        public ActionResult<GasConcentrationDto> CreateItem(CreateGasConcentrationDto itemDto)
        {
            GasConcentration gasConcentration = new()
            {
                Id = Guid.NewGuid(),
                City = itemDto.City,
                Months = itemDto.Months
            };

            repository.CreateGasConcentration(gasConcentration);

            return CreatedAtAction(nameof(GetItem), new { id = gasConcentration.Id }, gasConcentration.AsDto());
        }

        // PUT /items/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateItem(Guid id, UpdateGasConcentrationDto itemDto)
        {
            var existingItem = repository.GetGasConcentration(id);

            if (existingItem is null)
            {
                return NotFound();
            }

            GasConcentration updatedItem = existingItem with
            {
                City = itemDto.City
            };

            repository.UpdateGasConcentration(updatedItem);

            return NoContent();
        }

        // DELETE /items/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteItem(Guid id)
        {
            var existingItem = repository.GetGasConcentration(id);

            if (existingItem is null)
            {
                return NotFound();
            }

            repository.DeleteGasConcentration(id);

            return NoContent();
        }
    }
}