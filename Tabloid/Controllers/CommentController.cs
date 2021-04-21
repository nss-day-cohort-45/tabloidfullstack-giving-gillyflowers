using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }


        [HttpGet("byPost/{id}")]
        public IActionResult GetCommentsByPostId(int id)
        {
            var comments = _commentRepository.GetAllCommentsByPostId(id);
            if(comments == null)
            {
                return NotFound();
            }
            return Ok(comments);
        }

        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            var comment = _commentRepository.GetCommentById(id);
            if(comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost] 
        public IActionResult AddComment(Comment comment)
        {
            DateTime dateCreated = DateTime.Now;
            comment.CreateDateTime = dateCreated;

            _commentRepository.AddComment(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.UpdateComment(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }
    }
}
